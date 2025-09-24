import React, { useState, useEffect } from 'react';
import { User, Building2, Mail, Lock, Eye, EyeOff, BookOpen, Users, TrendingUp, Star, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedElements, setAnimatedElements] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });

  useEffect(() => {
    setAnimatedElements(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, userType });
  };

  const floatingElements = [
    { id: 1, size: 'w-12 h-12 md:w-20 md:h-20', position: 'top-4 left-4 md:top-10 md:left-10', delay: '0s' },
    { id: 2, size: 'w-10 h-10 md:w-16 md:h-16', position: 'top-20 right-8 md:top-32 md:right-20', delay: '2s' },
    { id: 3, size: 'w-8 h-8 md:w-12 md:h-12', position: 'bottom-16 left-8 md:bottom-20 md:left-16', delay: '1s' },
    { id: 4, size: 'w-14 h-14 md:w-24 md:h-24', position: 'bottom-24 right-6 md:bottom-32 md:right-12', delay: '3s' },
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
        <div className="absolute -top-20 -right-20 w-40 h-40 md:-top-40 md:-right-40 md:w-80 md:h-80 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 md:-bottom-40 md:-left-40 md:w-80 md:h-80 bg-gradient-to-br from-gray-800/10 to-gray-900/10 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div className={`w-full max-w-7xl bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000 ${
          animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col lg:flex-row min-h-[600px] md:min-h-[700px]">
            
            {/* Left Section */}
            <div className="lg:w-2/5 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 md:p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #f97316 0%, transparent 50%),
                                   radial-gradient(circle at 75% 75%, #f97316 0%, transparent 50%)`,
                  animation: 'pulse 4s ease-in-out infinite'
                }}></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-2 md:space-x-3 mb-6 md:mb-8">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg md:rounded-xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-300">
                    <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                      Klavuz
                    </h1>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-orange-400 fill-current" />
                      ))}
                      <span className="text-orange-400 text-xs md:text-sm ml-2">5.0 Rating</span>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                  {userType === 'teacher' ? (
                    <>
                      Öğretmenler İçin
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> Özel Platform</span>
                    </>
                  ) : userType === 'institution' ? (
                    <>
                      Kurumlar İçin
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> Güçlü Çözüm</span>
                    </>
                  ) : (
                    <>
                      Eğitimde
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> Yeni Dönem</span>
                    </>
                  )}
                </h2>
                
                <p className="text-gray-300 text-sm md:text-lg mb-8 md:mb-12 leading-relaxed">
                  {userType === 'teacher' ? 
                    'Sınıfınızı modern teknolojiyle yönetin. Öğrencilerinizin gelişimini takip edin, velilerle iletişim kurun ve eğitim kalitesini artırın.' :
                    userType === 'institution' ?
                    'Kurumunuzu dijital dönüşümle güçlendirin. Tüm sınıfları, öğretmenleri ve öğrencileri tek platformdan yönetin.' :
                    'Öğrencilerinizi takip edin, performanslarını analiz edin ve başarıya ulaşın. Modern eğitim yönetim sistemimizle fark yaratın.'
                  }
                </p>

                <div className="space-y-4 md:space-y-8">
                  {(userType === 'teacher' ? [
                    { icon: BookOpen, title: 'Sınıfınızı Yönetin', desc: 'Öğrencilerinizi kolayca takip edin', stats: '5K+ Öğretmen' },
                    { icon: TrendingUp, title: 'Performans Analizi', desc: 'Her öğrencinin gelişimini izleyin', stats: '%92 Başarı' },
                    { icon: Users, title: 'Veli İletişimi', desc: 'Velilerle anlık iletişim kurun', stats: '15K+ Mesaj' }
                  ] : userType === 'institution' ? [
                    { icon: Building2, title: 'Kurum Yönetimi', desc: 'Tüm sınıfları tek platformdan yönetin', stats: '500+ Kurum' },
                    { icon: Users, title: 'Öğretmen Takibi', desc: 'Öğretmenlerinizin performansını izleyin', stats: '2K+ Öğretmen' },
                    { icon: TrendingUp, title: 'Gelişmiş Raporlar', desc: 'Detaylı analytics ve başarı raporları', stats: '%98 Başarı' }
                  ] : [
                    { icon: BookOpen, title: 'Akıllı Takip Sistemi', desc: 'Öğrenci performansını anlık izleyin', stats: '10K+ Öğrenci' },
                    { icon: TrendingUp, title: 'Detaylı Raporlama', desc: 'Gelişim raporları ve analizler', stats: '%95 Başarı' },
                    { icon: Users, title: 'Kolay Yönetim', desc: 'Sınıf ve öğrenci yönetimi', stats: '500+ Kurum' }
                  ]).map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 md:space-x-4 group transition-all duration-500 ${
                        animatedElements ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg md:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg flex-shrink-0">
                        <item.icon className="w-4 h-4 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-semibold text-sm md:text-lg group-hover:text-orange-300 transition-colors truncate">{item.title}</h3>
                          <span className="text-orange-400 text-xs md:text-sm font-medium ml-2 flex-shrink-0">{item.stats}</span>
                        </div>
                        <p className="text-gray-400 text-xs md:text-sm mt-1 truncate">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Success Stats */}
                <div className="mt-8 md:mt-12 p-4 md:p-6 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl md:rounded-2xl border border-orange-500/30 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                    <div>
                      <div className="text-lg md:text-2xl font-bold text-white">15K+</div>
                      <div className="text-orange-300 text-xs md:text-sm">Aktif Kullanıcı</div>
                    </div>
                    <div>
                      <div className="text-lg md:text-2xl font-bold text-white">98%</div>
                      <div className="text-orange-300 text-xs md:text-sm">Memnuniyet</div>
                    </div>
                    <div>
                      <div className="text-lg md:text-2xl font-bold text-white">24/7</div>
                      <div className="text-orange-300 text-xs md:text-sm">Destek</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:w-3/5 p-4 md:p-6 lg:p-8 xl:p-12 flex flex-col justify-center">
              <div className="max-w-lg mx-auto w-full">
                <div className={`transition-all duration-700 ${
                  animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">Kayıt Ol</h2>
                  <p className="text-gray-600 mb-6 md:mb-10 text-sm md:text-lg">Hesabınızı oluşturun ve hemen başlayın</p>
                </div>

                {/* User Type Selection */}
                {!userType && (
                  <div className={`mb-6 md:mb-8 transition-all duration-700 delay-200 ${
                    animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6 flex items-center">
                      <span className="w-1.5 h-6 md:w-2 md:h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-2 md:mr-3"></span>
                      Hangi Role Sahipsiniz?
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:gap-6">
                      {[
                        {
                          type: 'teacher',
                          icon: User,
                          title: 'Öğretmen',
                          desc: 'Bireysel öğretmen hesabı oluştur',
                          features: ['Sınıf yönetimi', 'Ödev takibi', 'Performans raporu', 'Veli iletişimi'],
                          popular: false
                        },
                        {
                          type: 'institution',
                          icon: Building2,
                          title: 'Dershane/Okul',
                          desc: 'Kurum hesabı oluştur',
                          features: ['Çoklu sınıf', 'Öğretmen yönetimi', 'Gelişmiş raporlar', 'Analytics'],
                          popular: true
                        }
                      ].map((option, index) => (
                        <div
                          key={option.type}
                          className={`relative p-4 md:p-6 lg:p-8 border-2 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:shadow-lg md:hover:shadow-2xl ${
                            hoveredCard === option.type 
                              ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-white shadow-lg md:shadow-xl' 
                              : 'border-gray-200 hover:border-orange-300 bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'
                          }`}
                          onClick={() => setUserType(option.type)}
                          onMouseEnter={() => setHoveredCard(option.type)}
                          onMouseLeave={() => setHoveredCard(null)}
                          style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          {option.popular && (
                            <div className="absolute -top-2 left-4 md:-top-3 md:left-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 md:px-4 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium shadow-lg">
                              <Star className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
                              Popüler
                            </div>
                          )}
                          
                          <div className="flex items-start space-x-3 md:space-x-4 lg:space-x-6">
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-2xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                              hoveredCard === option.type 
                                ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg scale-110' 
                                : 'bg-gradient-to-br from-orange-100 to-orange-200'
                            }`}>
                              <option.icon className={`w-5 h-5 md:w-8 md:h-8 transition-colors ${
                                hoveredCard === option.type ? 'text-white' : 'text-orange-500'
                              }`} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1 md:mb-2">
                                <h4 className="text-base md:text-xl font-bold text-gray-900 truncate">{option.title}</h4>
                                <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${
                                  hoveredCard === option.type ? 'text-orange-500 translate-x-1' : 'text-gray-400'
                                }`} />
                              </div>
                              <p className="text-gray-600 text-sm md:text-base mb-2 md:mb-4 truncate">{option.desc}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-2">
                                {option.features.map((feature, i) => (
                                  <div key={i} className="flex items-center space-x-1 md:space-x-2">
                                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-xs md:text-sm text-gray-600 truncate">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Registration Form */}
                {userType && (
                  <div className={`transition-all duration-700 ${
                    userType ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                  }`}>
                    <div className="flex items-center justify-between mb-6 md:mb-8 p-3 md:p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg md:rounded-xl border border-orange-200">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        {userType === 'teacher' ? (
                          <>
                            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 md:w-6 md:h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-gray-900 text-sm md:text-base block truncate">Öğretmen Kaydı</span>
                              <p className="text-orange-600 text-xs md:text-sm truncate">Bireysel hesap oluşturuluyor</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-4 h-4 md:w-6 md:h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-gray-900 text-sm md:text-base block truncate">Kurum Kaydı</span>
                              <p className="text-orange-600 text-xs md:text-sm truncate">Kurumsal hesap oluşturuluyor</p>
                            </div>
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setUserType('')}
                        className="text-xs md:text-sm text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors whitespace-nowrap flex-shrink-0 ml-2"
                      >
                        Değiştir
                      </button>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <div className="group">
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 group-focus-within:text-orange-600 transition-colors">
                          {userType === 'teacher' ? 'Ad Soyad' : 'Kurum Adı'}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300 text-sm md:text-base"
                          placeholder={userType === 'teacher' ? 'Adınızı ve soyadınızı girin' : 'Kurum adınızı girin'}
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 group-focus-within:text-orange-600 transition-colors">E-posta</label>
                        <div className="relative">
                          <Mail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300 text-sm md:text-base"
                            placeholder="ornek@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 group-focus-within:text-orange-600 transition-colors">Telefon</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300 text-sm md:text-base"
                          placeholder="+90 (555) 123 45 67"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 group-focus-within:text-orange-600 transition-colors">Şifre</label>
                        <div className="relative">
                          <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full pl-10 md:pl-14 pr-10 md:pr-14 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300 text-sm md:text-base"
                            placeholder="En az 8 karakter"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-orange-500" />
                            ) : (
                              <Eye className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-orange-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 group-focus-within:text-orange-600 transition-colors">Şifre Tekrar</label>
                        <div className="relative">
                          <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full pl-10 md:pl-14 pr-10 md:pr-14 py-3 md:py-4 border-2 border-gray-200 rounded-lg md:rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300 text-sm md:text-base"
                            placeholder="Şifrenizi tekrar girin"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-orange-500" />
                            ) : (
                              <Eye className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-orange-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 md:space-x-3 p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl">
                        <input
                          type="checkbox"
                          id="terms"
                          className="w-4 h-4 md:w-5 md:h-5 text-orange-500 border-2 border-gray-300 rounded-md focus:ring-orange-500 focus:ring-2 mt-0.5 flex-shrink-0"
                          required
                        />
                        <label htmlFor="terms" className="text-xs md:text-sm text-gray-700 leading-relaxed">
                          <span className="text-orange-500 hover:text-orange-600 cursor-pointer font-medium hover:underline">Kullanım Şartları</span>'nı ve{' '}
                          <span className="text-orange-500 hover:text-orange-600 cursor-pointer font-medium hover:underline">Gizlilik Politikası</span>'nı kabul ediyorum
                        </label>
                      </div>

                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center space-x-1 md:space-x-2">
                          <span>Hesap Oluştur</span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      </button>

                      <div className="text-center">
                        <p className="text-gray-600 text-sm md:text-base">
                          Zaten hesabınız var mı?{' '}
                          <span className="text-orange-500 hover:text-orange-600 cursor-pointer font-semibold hover:underline transition-all">
                            Giriş Yap
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}