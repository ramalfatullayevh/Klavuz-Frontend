import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, BookOpen, Users, TrendingUp, Star, Sparkles, AlertCircle, MapPin, Clock, RefreshCw } from 'lucide-react';

export default function NotFoundPage() {
  const [animatedElements, setAnimatedElements] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setAnimatedElements(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const floatingElements = [
    { id: 1, size: 'w-16 h-16', position: 'top-20 left-20', delay: '0s' },
    { id: 2, size: 'w-12 h-12', position: 'top-40 right-32', delay: '2s' },
    { id: 3, size: 'w-20 h-20', position: 'bottom-32 left-24', delay: '1s' },
    { id: 4, size: 'w-14 h-14', position: 'bottom-20 right-20', delay: '3s' },
    { id: 5, size: 'w-10 h-10', position: 'top-1/2 left-12', delay: '4s' },
    { id: 6, size: 'w-18 h-18', position: 'bottom-1/2 right-16', delay: '2.5s' },
  ];

  const quickLinks = [
    { icon: Home, title: 'Ana Sayfa', desc: 'Ana sayfaya dön', path: '/' },
    { icon: BookOpen, title: 'Dersler', desc: 'Ders içeriklerini görüntüle', path: '/courses' },
    { icon: Users, title: 'Sınıflar', desc: 'Sınıf yönetimine git', path: '/classes' },
    { icon: TrendingUp, title: 'Raporlar', desc: 'Performans raporlarını gör', path: '/reports' }
  ];

  const helpfulTips = [
    'URL\'nin doğru yazıldığından emin olun',
    'Ana sayfadan tekrar başlayabilirsiniz',
    'Arama özelliğini kullanarak istediğinizi bulabilirsiniz',
    'Destek ekibimizle iletişime geçebilirsiniz'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className={`absolute ${element.size} ${element.position} bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 animate-pulse`}
          style={{
            animationDelay: element.delay,
            animationDuration: '4s'
          }}
        ></div>
      ))}

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-gray-800/10 to-gray-900/10 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-300/10 to-orange-500/10 rounded-full animate-pulse" style={{ animationDuration: '6s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000 ${
          animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            
            {/* Left Section - Error Info */}
            <div className="lg:w-2/5 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #f97316 0%, transparent 50%),
                                   radial-gradient(circle at 75% 75%, #f97316 0%, transparent 50%)`,
                  animation: 'pulse 4s ease-in-out infinite'
                }}></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6 lg:mb-8">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-300">
                    <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                      Klavuz
                    </h1>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 text-orange-400 fill-current" />
                      ))}
                      <span className="text-orange-400 text-xs lg:text-sm ml-2">5.0 Rating</span>
                    </div>
                  </div>
                </div>
                
                {/* Large 404 Display */}
                <div className="text-center mb-6 lg:mb-8">
                  <div className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4 animate-pulse">
                    404
                  </div>
                  <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
                </div>
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4 text-center">
                  Sayfa
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> Bulunamadı</span>
                </h2>
                
                <p className="text-gray-300 text-base lg:text-lg mb-8 lg:mb-12 leading-relaxed text-center">
                  Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
                  Ana sayfaya dönebilir veya aşağıdaki bağlantıları kullanabilirsiniz.
                </p>

                {/* Error Status Info */}
                <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-10">
                  {[
                    { icon: AlertCircle, title: 'Durum', desc: 'Sayfa Bulunamadı', status: 'Hata 404' },
                    
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 lg:space-x-4 group transition-all duration-500 ${
                        animatedElements ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <item.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-semibold text-base lg:text-lg">{item.title}</h3>
                          <span className="text-red-400 text-xs lg:text-sm font-medium">{item.status}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Helpful Tips */}
                <div className="p-4 lg:p-6 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl lg:rounded-2xl border border-orange-500/30 backdrop-blur-sm">
                  <h4 className="text-white font-semibold text-base lg:text-lg mb-3 lg:mb-4">Yardımcı İpuçları</h4>
                  <ul className="space-y-2">
                    {helpfulTips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <div className="grid grid-cols-3 gap-2 lg:gap-4 text-center">
                    <div>
                      <div className="text-lg lg:text-xl font-bold text-white">1.2K+</div>
                      <div className="text-orange-300 text-xs lg:text-sm">Aktif Kullanıcı</div>
                    </div>
                    <div>
                      <div className="text-lg lg:text-xl font-bold text-white">15K+</div>
                      <div className="text-orange-300 text-xs lg:text-sm">Başarılı Giriş</div>
                    </div>
                    <div>
                      <div className="text-lg lg:text-xl font-bold text-white">24/7</div>
                      <div className="text-orange-300 text-xs lg:text-sm">Destek</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Navigation Options */}
            <div className="lg:w-3/5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-lg mx-auto w-full">
                <div className={`transition-all duration-700 ${
                  animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 lg:mb-3">Ne Yapmak İstiyorsunuz?</h2>
                  <p className="text-gray-600 mb-8 lg:mb-10 text-base lg:text-lg">Size yardımcı olabilecek seçenekler aşağıda</p>
                </div>

                {/* Search Box */}
                <div className={`mb-8 lg:mb-10 transition-all duration-700 delay-200 ${
                  animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                      placeholder="Aradığınızı buraya yazın..."
                    />
                    <button
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium"
                    >
                      Ara
                    </button>
                  </div>
                </div>

                {/* Quick Navigation Links */}
                <div className={`space-y-4 mb-8 lg:mb-10 transition-all duration-700 delay-400 ${
                  animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Hızlı Erişim</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickLinks.map((link, index) => (
                      <button
                        key={index}
                        className="flex items-center space-x-4 p-4 lg:p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-gradient-to-br hover:from-gray-50 hover:to-orange-50 transition-all duration-300 group text-left"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300">
                          <link.icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors truncate">{link.title}</h4>
                          <p className="text-sm text-gray-600 truncate">{link.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className={`space-y-4 transition-all duration-700 delay-600 ${
                  animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-2xl relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Home className="w-5 h-5" />
                      <span>Ana Sayfaya Dön</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="flex items-center justify-center px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
                      <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-orange-500 mr-2 transition-colors" />
                      <span className="text-gray-700 group-hover:text-orange-600 font-medium transition-colors">Geri Git</span>
                    </button>
                    <button className="flex items-center justify-center px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
                      <RefreshCw className="w-5 h-5 text-gray-600 group-hover:text-orange-500 mr-2 transition-colors" />
                      <span className="text-gray-700 group-hover:text-orange-600 font-medium transition-colors">Yenile</span>
                    </button>
                  </div>
                </div>

                {/* Support Contact */}
                <div className={`mt-8 lg:mt-10 p-4 lg:p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border border-orange-100 transition-all duration-700 delay-800 ${
                  animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <h4 className="font-semibold text-gray-900 mb-2">Hala yardıma mı ihtiyacınız var?</h4>
                  <p className="text-sm text-gray-600 mb-4">Destek ekibimiz size yardımcı olmaya hazır.</p>
                  <button className="text-orange-500 hover:text-orange-600 font-medium text-sm hover:underline transition-all">
                    Destek ile İletişime Geç →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}