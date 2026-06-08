'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, ChevronRight, ChevronLeft, Check, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useOrderStore } from '@/store/orders';
import { siteConfig } from '@/config/site';

type Step = 1 | 2 | 3;
type PaymentMethod = 'pix' | 'credit' | 'cash';

interface BuyerInfo {
  name: string;
  phone: string;
}

interface AddressInfo {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

const BUYER_KEY = 'perfume-buyer';
const ADDRESS_KEY = 'perfume-address';

const STEPS = [
  { n: 1 as Step, label: 'Identificação' },
  { n: 2 as Step, label: 'Endereço' },
  { n: 3 as Step, label: 'Pagamento' },
];

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; desc: string }[] = [
  { value: 'pix', label: 'PIX', desc: 'Transferência instantânea' },
  { value: 'credit', label: 'Cartão de Crédito', desc: 'Crédito ou débito' },
  { value: 'cash', label: 'Pagamento na Entrega', desc: 'Dinheiro ou débito' },
];

const INPUT_CLASS =
  'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-dark bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-gray-300';

// Formats digits to (XX) XXXXX-XXXX as the user types
const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export function CheckoutModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [buyer, setBuyer] = useState<BuyerInfo>({ name: '', phone: '' });
  const [address, setAddress] = useState<AddressInfo>({
    cep: '', street: '', number: '', complement: '',
    neighborhood: '', city: '', state: '',
  });
  const [payment, setPayment] = useState<PaymentMethod>('pix');
  const [needsChange, setNeedsChange] = useState(false);
  const [changeAmount, setChangeAmount] = useState('');
  const [cepLoading, setCepLoading] = useState(false);

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.getTotalPrice());
  const shipping = subtotal < 299 ? 30 : 0;
  const total = subtotal + shipping;
  const addOrder = useOrderStore((s) => s.addOrder);

  // Pre-fill from previous order
  useEffect(() => {
    try {
      const b = localStorage.getItem(BUYER_KEY);
      if (b) setBuyer(JSON.parse(b));
      const a = localStorage.getItem(ADDRESS_KEY);
      if (a) setAddress(JSON.parse(a));
    } catch {
      // localStorage unavailable
    }
  }, []);

  const canProceed =
    step === 1
      ? buyer.name.trim().length > 1 && buyer.phone.replace(/\D/g, '').length >= 10
      : step === 2
      ? !!(address.street.trim() && address.number.trim() && address.city.trim() && address.state.trim())
      : true;

  // Auto-fill address from CEP via ViaCEP
  const handleCepBlur = useCallback(async () => {
    const clean = address.cep.replace(/\D/g, '');
    if (clean.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setAddress((p) => ({
          ...p,
          street: data.logradouro || p.street,
          neighborhood: data.bairro || p.neighborhood,
          city: data.localidade || p.city,
          state: data.uf || p.state,
        }));
      }
    } catch {
      // ViaCEP unavailable — user fills manually
    } finally {
      setCepLoading(false);
    }
  }, [address.cep]);

  const handleFinish = () => {
    const payLabel = PAYMENT_OPTIONS.find((p) => p.value === payment)?.label ?? payment;

    // Persist buyer info and address for next order
    try {
      localStorage.setItem(BUYER_KEY, JSON.stringify(buyer));
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
    } catch {
      // ignore
    }

    // Save to orders history
    addOrder({
      buyer,
      address,
      payment,
      total,
      shipping,
      items: items.map((item) => ({
        id: item.id,
        nome: item.nome,
        marca: item.marca,
        volume: item.volume,
        preco: item.preco,
        quantidadeCarrinho: item.quantidadeCarrinho,
        imagem: item.imagem,
      })),
      needsChange: payment === 'cash' && needsChange,
      changeAmount: payment === 'cash' && needsChange ? changeAmount : null,
    });

    // Pass order info to the /obrigado page
    try {
      sessionStorage.setItem(
        'last-order',
        JSON.stringify({
          payment,
          total,
          needsChange: payment === 'cash' && needsChange,
          changeAmount: payment === 'cash' && needsChange ? changeAmount : null,
        })
      );
    } catch {
      // ignore
    }

    let msg = `Olá! Gostaria de finalizar meu pedido:\n\n`;
    msg += `👤 *Comprador:* ${buyer.name}\n`;
    msg += `📱 *Telefone:* ${buyer.phone}\n\n`;
    msg += `📍 *Endereço de Entrega:*\n`;
    msg += `${address.street}, ${address.number}`;
    if (address.complement) msg += ` — ${address.complement}`;
    if (address.neighborhood) msg += `\n${address.neighborhood}`;
    msg += `\n${address.city} / ${address.state.toUpperCase()}`;
    if (address.cep) msg += ` — CEP: ${address.cep}`;
    msg += `\n\n🛍️ *Produtos:*\n`;
    items.forEach((item) => {
      msg += `• ${item.nome} (${item.volume}) × ${item.quantidadeCarrinho} — R$ ${(item.preco * item.quantidadeCarrinho).toFixed(2)}\n`;
    });
    msg += `\n💳 *Pagamento:* ${payLabel}`;
    if (payment === 'cash' && needsChange) {
      msg += changeAmount
        ? `\n💵 *Troco para:* R$ ${changeAmount}`
        : `\n💵 *Troco necessário*`;
    }
    if (shipping > 0) msg += `\n📦 *Frete:* R$ ${shipping.toFixed(2)}`;
    msg += `\n💰 *Total: R$ ${total.toFixed(2)}*`;

    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
    clearCart();
    router.push('/obrigado');
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Steps header */}
        <div className="bg-dark px-6 pt-6 pb-5 flex-shrink-0">
          <div className="flex items-center">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step > s.n
                        ? 'bg-accent text-dark'
                        : step === s.n
                        ? 'bg-accent text-dark'
                        : 'bg-white/10 text-white/35'
                    }`}
                  >
                    {step > s.n ? <Check size={13} strokeWidth={2.5} /> : s.n}
                  </div>
                  <span
                    className={`text-[9px] mt-1.5 tracking-widest uppercase transition-colors ${
                      step >= s.n ? 'text-accent' : 'text-white/25'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 mb-4 transition-all duration-500 ${
                      step > s.n ? 'bg-accent' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable form area */}
        <div className="overflow-y-auto flex-1 px-6 py-5 text-dark">
          {/* ── Step 1: Buyer info ── */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-elegant text-2xl font-light text-dark">
                Suas informações
              </h3>
              <div>
                <label className="text-[10px] text-gray-400 tracking-[0.15em] uppercase block mb-1.5">
                  Nome completo *
                </label>
                <input
                  type="text"
                  value={buyer.name}
                  onChange={(e) => setBuyer((p) => ({ ...p, name: e.target.value }))}
                  placeholder="João da Silva"
                  className={INPUT_CLASS}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 tracking-[0.15em] uppercase block mb-1.5">
                  WhatsApp / Telefone *
                </label>
                <input
                  type="tel"
                  value={buyer.phone}
                  onChange={(e) =>
                    setBuyer((p) => ({ ...p, phone: maskPhone(e.target.value) }))
                  }
                  placeholder="(11) 99999-9999"
                  className={INPUT_CLASS}
                  maxLength={15}
                />
              </div>
            </div>
          )}

          {/* ── Step 2: Address ── */}
          {step === 2 && (
            <div className="space-y-3">
              <h3 className="font-elegant text-2xl font-light text-dark">
                Endereço de entrega
              </h3>

              <div>
                <label className="text-[10px] text-gray-400 tracking-[0.15em] uppercase block mb-1.5">
                  CEP {cepLoading && <span className="text-accent">(buscando…)</span>}
                </label>
                <input
                  type="text"
                  value={address.cep}
                  onChange={(e) => setAddress((p) => ({ ...p, cep: e.target.value }))}
                  onBlur={handleCepBlur}
                  placeholder="00000-000"
                  maxLength={9}
                  className={INPUT_CLASS}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-[10px] text-gray-400 tracking-[0.15em] uppercase block mb-1.5">
                    Rua / Avenida *
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress((p) => ({ ...p, street: e.target.value }))}
                    placeholder="Rua das Flores"
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 tracking-[0.15em] uppercase block mb-1.5">
                    Número *
                  </label>
                  <input
                    type="text"
                    value={address.number}
                    onChange={(e) => setAddress((p) => ({ ...p, number: e.target.value }))}
                    placeholder="123"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-gray-400 tracking-[0.15em] uppercase block mb-1.5">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={address.complement}
                    onChange={(e) => setAddress((p) => ({ ...p, complement: e.target.value }))}
                    placeholder="Apto 4B"
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 tracking-[0.15em] uppercase block mb-1.5">
                    Bairro
                  </label>
                  <input
                    type="text"
                    value={address.neighborhood}
                    onChange={(e) => setAddress((p) => ({ ...p, neighborhood: e.target.value }))}
                    placeholder="Centro"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-[10px] text-gray-400 tracking-[0.15em] uppercase block mb-1.5">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress((p) => ({ ...p, city: e.target.value }))}
                    placeholder="São Paulo"
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 tracking-[0.15em] uppercase block mb-1.5">
                    UF *
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) =>
                      setAddress((p) => ({
                        ...p,
                        state: e.target.value.toUpperCase().slice(0, 2),
                      }))
                    }
                    placeholder="SP"
                    maxLength={2}
                    className={`${INPUT_CLASS} uppercase`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Payment + Summary ── */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-elegant text-2xl font-light text-dark">
                Forma de pagamento
              </h3>

              <div className="space-y-2">
                {PAYMENT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setPayment(opt.value);
                      if (opt.value !== 'cash') {
                        setNeedsChange(false);
                        setChangeAmount('');
                      }
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      payment === opt.value
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        payment === opt.value ? 'border-accent' : 'border-gray-300'
                      }`}
                    >
                      {payment === opt.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark">{opt.label}</p>
                      <p className="text-xs text-gray-400 font-light">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Change question — shown only for cash */}
              {payment === 'cash' && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-medium text-dark">Precisará de troco?</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setNeedsChange(true)}
                      className={`flex-1 py-2 rounded-lg text-sm border-2 transition-all ${
                        needsChange
                          ? 'border-accent bg-accent/5 text-dark font-medium'
                          : 'border-gray-200 text-gray-500 font-light'
                      }`}
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      onClick={() => { setNeedsChange(false); setChangeAmount(''); }}
                      className={`flex-1 py-2 rounded-lg text-sm border-2 transition-all ${
                        !needsChange
                          ? 'border-accent bg-accent/5 text-dark font-medium'
                          : 'border-gray-200 text-gray-500 font-light'
                      }`}
                    >
                      Não
                    </button>
                  </div>
                  {needsChange && (
                    <div>
                      <label className="text-[10px] text-gray-400 tracking-[0.15em] uppercase block mb-1.5">
                        Troco para quanto?
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={changeAmount}
                        onChange={(e) => setChangeAmount(e.target.value)}
                        placeholder="Ex: 100,00"
                        className={INPUT_CLASS}
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Order summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-[9px] text-gray-400 tracking-[0.2em] uppercase mb-3">
                  Resumo do pedido
                </p>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm font-light text-dark mb-1"
                  >
                    <span className="truncate mr-2">
                      {item.nome} ×{item.quantidadeCarrinho}
                    </span>
                    <span className="flex-shrink-0">
                      R$ {(item.preco * item.quantidadeCarrinho).toFixed(2)}
                    </span>
                  </div>
                ))}
                {shipping > 0 && (
                  <div className="flex justify-between text-sm font-light text-gray-500 mt-1">
                    <span>Frete</span>
                    <span>R$ {shipping.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-medium text-dark">
                  <span>Total</span>
                  <span className="text-accent text-base">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation footer */}
        <div className="flex-shrink-0 px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="flex items-center gap-1.5 text-gray-400 hover:text-dark text-sm font-light transition-colors"
            >
              <ChevronLeft size={16} />
              Voltar
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={!canProceed}
              className="flex items-center gap-2 bg-accent text-dark px-7 py-3 rounded-lg text-sm font-semibold tracking-wide hover:bg-yellow-400 transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
            >
              Continuar
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 bg-dark text-white px-7 py-3 rounded-lg text-sm font-semibold tracking-wide hover:bg-dark/80 transition-colors"
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              Enviar pedido
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
