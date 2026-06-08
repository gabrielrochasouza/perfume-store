import { Mail, Phone, MapPin, Sparkles, Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-dark text-white py-16 border-t border-accent/10">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-4 px-4 lg:px-0">
          <div className="font-elegant text-3xl font-light tracking-widest text-accent inline-flex items-center gap-2">
            <Sparkles size={20} strokeWidth={1.5} />
            {siteConfig.name.toUpperCase()}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            {siteConfig.slogan}
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="font-elegant text-lg font-light tracking-wide text-white">Navegação</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-accent transition-colors duration-300 font-light">Home</a></li>
            <li><a href="/produtos" className="hover:text-accent transition-colors duration-300 font-light">Produtos</a></li>
            <li><a href="#" className="hover:text-accent transition-colors duration-300 font-light">Sobre</a></li>
            <li><a href="#" className="hover:text-accent transition-colors duration-300 font-light">FAQ</a></li>
          </ul>
        </div>

        {/* Suporte */}
        <div className="space-y-4">
          <h4 className="font-elegant text-lg font-light tracking-wide text-white">Suporte</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-accent transition-colors duration-300 font-light">Contato</a></li>
            <li><a href="#" className="hover:text-accent transition-colors duration-300 font-light">Frete</a></li>
            <li><a href="#" className="hover:text-accent transition-colors duration-300 font-light">Devoluções</a></li>
            <li><a href="#" className="hover:text-accent transition-colors duration-300 font-light">Política de Privacidade</a></li>
          </ul>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <h4 className="font-elegant text-lg font-light tracking-wide text-white">Contato</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Mail size={16} strokeWidth={1.5} />
              <span className="font-light">{siteConfig.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} strokeWidth={1.5} />
              <span className="font-light">{siteConfig.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} strokeWidth={1.5} />
              <span className="font-light">{siteConfig.city}, {siteConfig.state}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-accent/20 pt-8">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-500 font-light">
          <p>&copy; {siteConfig.foundedYear} {siteConfig.name}. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a
              href={`https://instagram.com/${siteConfig.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-300"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a
              href={`https://facebook.com/${siteConfig.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-300"
            >
              <Facebook size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
