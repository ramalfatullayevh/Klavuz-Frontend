import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, BookOpen, Users, TrendingUp, Star, ArrowRight, Sparkles, Shield, Zap, Award } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [animatedElements, setAnimatedElements] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    console.log('Login submitted:', { ...formData, rememberMe });
  };

  const floatingElements = [
    { id: 1, size: 'w-16 h-16', position: 'top-20 left-20', delay: '0s' },
    { id: 2, size: 'w-12 h-12', position: 'top-40 right-32', delay: '2s' },
    { id: 3, size: 'w-20 h-20', position: 'bottom-32 left-24', delay: '1s' },
    { id: 4, size: 'w-14 h-14', position: 'bottom-20 right-20', delay: '3s' },
  ];

  const features = [
    { icon: Shield, title: 'Güvenli Giriş', desc: 'SSL şifreleme ile korumalı', stats: '256-bit SSL' },
    { icon: Zap, title: 'Hızlı Erişim', desc: 'Anında platformda olun', stats: '<2sn Yükleme' },
    { icon: Award, title: 'Güvenilir Platform', desc: '7/24 kesintisiz hizmet', stats: '%99.9 Uptime' }
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
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000 ${
          animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col lg:flex-row min-h-[500px] lg:min-h-[600px]">
            
            {/* Left Section */}
            <div className="lg:w-2/5 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 sm:p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden order-2 lg:order-1">
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
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">
                  Tekrar
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> Hoş Geldiniz</span>
                </h2>
                
                <p className="text-gray-300 text-base lg:text-lg mb-8 lg:mb-12 leading-relaxed">
                  Eğitim yolculuğunuza kaldığınız yerden devam edin. 
                  Öğrencileriniz ve başarılarınız sizi bekliyor.
                </p>

                <div className="space-y-6 lg:space-y-8">
                  {features.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 lg:space-x-4 group transition-all duration-500 ${
                        animatedElements ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                        <item.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-semibold text-base lg:text-lg group-hover:text-orange-300 transition-colors">{item.title}</h3>
                          <span className="text-orange-400 text-xs lg:text-sm font-medium flex-shrink-0">{item.stats}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Welcome Back Stats */}
                <div className="mt-8 lg:mt-12 p-4 lg:p-6 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl lg:rounded-2xl border border-orange-500/30 backdrop-blur-sm">
                  <div className="text-center mb-3 lg:mb-4">
                    <h4 className="text-white font-semibold text-base lg:text-lg mb-2">Bugün Platformda</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2 lg:gap-4 text-center">
                    <div>
                      <div className="text-lg lg:text-xl font-bold text-white">1.2K+</div>
                      <div className="text-orange-300 text-xs lg:text-sm">Aktif Öğretmen</div>
                    </div>
                    <div>
                      <div className="text-lg lg:text-xl font-bold text-white">15K+</div>
                      <div className="text-orange-300 text-xs lg:text-sm">Online Öğrenci</div>
                    </div>
                    <div>
                      <div className="text-lg lg:text-xl font-bold text-white">850+</div>
                      <div className="text-orange-300 text-xs lg:text-sm">Aktif Ders</div>
                    </div>
                  </div>
                </div>

                {/* Quick Access */}
                <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium text-sm lg:text-base">Hızlı Erişim</h4>
                      <p className="text-gray-400 text-xs lg:text-sm">Demo hesabı ile test edin</p>
                    </div>
                    <button className="px-3 lg:px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs lg:text-sm font-medium rounded-lg transition-colors">
                      Demo Giriş
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:w-3/5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
              <div className="max-w-lg mx-auto w-full">
                <div className={`transition-all duration-700 ${
                  animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 lg:mb-3">Giriş Yap</h2>
                  <p className="text-gray-600 mb-8 lg:mb-10 text-base lg:text-lg">Hesabınıza giriş yapın ve devam edin</p>
                </div>

                <div className={`transition-all duration-700 delay-200 ${
                  animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}>
                  
                  {/* Login Form */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-orange-600 transition-colors">
                        E-posta Adresi
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                          placeholder="ornek@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-orange-600 transition-colors">
                        Şifre
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-14 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-gray-300"
                          placeholder="Şifrenizi girin"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400 hover:text-orange-500" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400 hover:text-orange-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="remember"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded-md focus:ring-orange-500 focus:ring-2"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-700 font-medium">
                          Beni Hatırla
                        </label>
                      </div>
                      <button className="text-sm text-orange-500 hover:text-orange-600 font-medium hover:underline transition-all">
                        Şifremi Unuttum
                      </button>
                    </div>

                    {/* Login Button */}
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-2xl relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>Giriş Yap</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </button>

                    {/* Social Login */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-medium">veya devam edin</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                      <button className="flex items-center justify-center px-4 lg:px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-2 lg:mr-3">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <span className="text-gray-700 font-medium text-sm lg:text-base">Google</span>
                      </button>
                      <button className="flex items-center justify-center px-4 lg:px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mr-2 lg:mr-3">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                        <span className="text-gray-700 font-medium text-sm lg:text-base">Microsoft</span>
                      </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                      <p className="text-gray-600">
                        Hesabınız yok mu?{' '}
                        <span className="text-orange-500 hover:text-orange-600 cursor-pointer font-semibold hover:underline transition-all">
                          Kayıt Ol
                        </span>
                      </p>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border border-orange-100">
                      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
                          <span className="text-xs lg:text-sm text-gray-600 font-medium">SSL Güvenli</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
                          <span className="text-xs lg:text-sm text-gray-600 font-medium">ISO 27001</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-orange-500" />
                          <span className="text-xs lg:text-sm text-gray-600 font-medium">Hızlı Giriş</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}