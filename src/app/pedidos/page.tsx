'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  ChevronDown,
  MessageCircle,
  Trash2,
  MapPin,
  CreditCard,
  Package,
  Loader2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  useOrderStore,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_COLOR,
  ORDER_STATUS_DOT,
  type Order,
} from '@/store/orders';
import { siteConfig } from '@/config/site';

const PAYMENT_LABEL: Record<string, string> = {
  pix: 'PIX',
  credit: 'Cartão de Crédito',
  cash: 'Pagamento na Entrega',
};

// Orders in these statuses are still "in flight" — show the spinning loader
const IN_PROGRESS_STATUSES = new Set(['pending', 'confirmed', 'preparing', 'shipped']);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ── Cancel confirmation modal ────────────────────────────────────────────────
function CancelModal({
  orderId,
  onClose,
}: {
  orderId: string;
  onClose: () => void;
}) {
  const updateStatus = useOrderStore((s) => s.updateStatus);

  const handleConfirm = () => {
    updateStatus(orderId, 'cancelled');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-dark/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 8 }}
        transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={26} strokeWidth={1.5} className="text-red-500" />
        </div>

        <h3 className="font-elegant text-2xl font-light text-dark mb-2">
          Cancelar pedido?
        </h3>
        <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
          Esta ação não pode ser desfeita. O pedido será marcado como{' '}
          <span className="font-medium text-red-500">Cancelado</span>.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-light text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Sim, cancelar
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Single order card ────────────────────────────────────────────────────────
function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const removeOrder = useOrderStore((s) => s.removeOrder);

  const isInProgress = IN_PROGRESS_STATUSES.has(order.status);
  const canCancel = order.status !== 'delivered' && order.status !== 'cancelled';

  const whatsappMsg = encodeURIComponent(
    `Olá! Gostaria de verificar o status do pedido *${order.id}* feito em ${formatDate(order.createdAt)}.\n\nTotal: R$ ${order.total.toFixed(2)}`
  );

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
        className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        {/* ── Header row (always visible) ── */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Spinning loader for in-progress, static dot for terminal */}
            {isInProgress ? (
              <Loader2
                size={14}
                strokeWidth={2}
                className="animate-spin text-accent flex-shrink-0"
              />
            ) : (
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${ORDER_STATUS_DOT[order.status]}`}
              />
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-sm font-semibold text-dark">
                  {order.id}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${ORDER_STATUS_COLOR[order.status]}`}
                >
                  {ORDER_STATUS_LABEL[order.status]}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-light mt-0.5">
                {formatDate(order.createdAt)} · {order.items.length}{' '}
                {order.items.length === 1 ? 'item' : 'itens'} ·{' '}
                <span className="text-accent font-medium">
                  R$ {order.total.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* ── Expanded detail ── */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-5 border-t border-gray-50">
                {/* Items */}
                <div className="pt-4 space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.imagem}
                          alt={item.nome}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-light text-dark leading-tight truncate">
                          {item.nome}
                        </p>
                        <p className="text-xs text-gray-400 font-light">
                          {item.marca} · {item.volume} · ×{item.quantidadeCarrinho}
                        </p>
                      </div>
                      <span className="text-sm font-light text-dark flex-shrink-0">
                        R$ {(item.preco * item.quantidadeCarrinho).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Address + Payment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={13} strokeWidth={1.5} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400 tracking-[0.12em] uppercase">
                        Entrega
                      </span>
                    </div>
                    <p className="text-sm font-light text-dark leading-relaxed">
                      {order.address.street}, {order.address.number}
                      {order.address.complement ? ` — ${order.address.complement}` : ''}
                      {order.address.neighborhood ? `, ${order.address.neighborhood}` : ''}
                    </p>
                    <p className="text-xs text-gray-500 font-light">
                      {order.address.city} / {order.address.state.toUpperCase()}
                      {order.address.cep ? ` — ${order.address.cep}` : ''}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard size={13} strokeWidth={1.5} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400 tracking-[0.12em] uppercase">
                        Pagamento
                      </span>
                    </div>
                    <p className="text-sm font-light text-dark">
                      {PAYMENT_LABEL[order.payment] ?? order.payment}
                    </p>
                    {order.payment === 'cash' && order.needsChange && (
                      <p className="text-xs text-gray-500 font-light mt-1">
                        {order.changeAmount
                          ? `Troco para R$ ${order.changeAmount}`
                          : 'Troco necessário'}
                      </p>
                    )}
                    <div className="flex justify-between mt-3 pt-3 border-t border-gray-200 text-sm">
                      {order.shipping > 0 && (
                        <span className="text-gray-400 font-light text-xs">
                          Frete R$ {order.shipping.toFixed(2)}
                        </span>
                      )}
                      <span className="font-medium text-accent ml-auto">
                        Total R$ {order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status row — read-only */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Package size={13} strokeWidth={1.5} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-400 tracking-[0.1em] uppercase flex-shrink-0">
                      Status
                    </span>
                    {/* Read-only badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${ORDER_STATUS_COLOR[order.status]}`}
                    >
                      {isInProgress && (
                        <Loader2 size={11} strokeWidth={2.5} className="animate-spin" />
                      )}
                      {ORDER_STATUS_LABEL[order.status]}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-dark text-white text-xs font-medium rounded-lg hover:bg-dark/80 transition-colors"
                    >
                      <MessageCircle size={13} strokeWidth={1.5} />
                      WhatsApp
                    </a>

                    {/* Cancel — only while order is still active */}
                    {canCancel && (
                      <button
                        onClick={() => setCancelOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-500 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <XCircle size={13} strokeWidth={1.5} />
                        Cancelar
                      </button>
                    )}

                    <button
                      onClick={() => removeOrder(order.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                      title="Remover do histórico"
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cancel confirmation modal */}
      <AnimatePresence>
        {cancelOpen && (
          <CancelModal
            orderId={order.id}
            onClose={() => setCancelOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PedidosPage() {
  const orders = useOrderStore((s) => s.orders);

  return (
    <main className="min-h-screen bg-white text-dark">
      {/* Page header */}
      <section className="bg-dark text-white py-14 border-b border-accent/10">
        <div className="container-custom">
          <p className="text-[10px] text-accent tracking-[0.3em] uppercase mb-3">
            Histórico
          </p>
          <h1 className="font-elegant text-5xl md:text-6xl font-light tracking-tight">
            Meus Pedidos
          </h1>
          <p className="text-gray-400 mt-3 font-light text-sm">
            {orders.length === 0
              ? 'Nenhum pedido realizado ainda'
              : `${orders.length} pedido${orders.length > 1 ? 's' : ''} no histórico`}
          </p>
        </div>
      </section>

      <div className="container-custom py-10 md:py-14">
        {orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={28} strokeWidth={1.3} className="text-gray-300" />
            </div>
            <h2 className="font-elegant text-3xl font-light text-dark mb-3">
              Nenhum pedido ainda
            </h2>
            <p className="text-gray-400 font-light mb-8 text-sm">
              Quando você finalizar uma compra, ela aparecerá aqui.
            </p>
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 bg-accent text-dark px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide hover:bg-yellow-400 transition-colors"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              Ver Produtos
            </Link>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 mb-6">
              <span className="text-accent mt-0.5 flex-shrink-0">ℹ</span>
              <p className="text-xs text-gray-600 font-light leading-relaxed">
                O status é atualizado pela loja via WhatsApp. O ícone{' '}
                <Loader2
                  size={11}
                  strokeWidth={2.5}
                  className="inline animate-spin text-accent"
                />{' '}
                indica que o pedido está em andamento.
              </p>
            </div>

            <AnimatePresence mode="popLayout">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}
