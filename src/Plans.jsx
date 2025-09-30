import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, Target, TrendingUp, Star, Sparkles, Clock, Award, CheckCircle, BarChart3, Users, Plus, Minus, Zap, Flame, Trophy, Play, Pause, RotateCcw, Edit3, Trash2, Eye, Filter, Search, ChevronDown, ChevronRight, X } from 'lucide-react';

export default function MyStudyPlans() {
  const [animatedElements, setAnimatedElements] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPlan, setExpandedPlan] = useState(null);
  
  // Modal state'leri
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [todayStats, setTodayStats] = useState({
    solved: 0,
    correct: 0,
    wrong: 0
  });

  useEffect(() => {
    setAnimatedElements(true);
  }, []);

  // Örnek çalışma planları verisi
  const studyPlans = [
    {
      id: 1,
      courseName: 'Matematik',
      bookName: 'Cebir ve Fonksiyonlar',
      author: 'Dr. Mehmet Özkan',
      startDate: new Date('2024-09-15'),
      endDate: new Date('2024-10-15'),
      totalQuestions: 380,
      completedQuestions: 245,
      dailyTarget: 13,
      streak: 12,
      maxStreak: 18,
      status: 'active',
      difficulty: 'Orta',
      topics: ['Cebirsel İfadeler', 'Denklemler', 'Fonksiyonlar', 'Grafik'],
      color: 'from-blue-500 to-blue-600',
      icon: '📐',
      lastStudied: new Date('2024-09-27'),
      createdAt: new Date('2024-09-15'),
      dailyProgress: [
        { date: '2024-09-20', completed: 15, target: 13 },
        { date: '2024-09-21', completed: 12, target: 13 },
        { date: '2024-09-22', completed: 16, target: 13 },
        { date: '2024-09-23', completed: 11, target: 13 },
        { date: '2024-09-24', completed: 14, target: 13 },
        { date: '2024-09-25', completed: 13, target: 13 },
        { date: '2024-09-26', completed: 15, target: 13 },
      ]
    },
    {
      id: 2,
      courseName: 'Türkçe',
      bookName: 'Metin Anlama ve Yorumlama',
      author: 'Dr. Can Şahin',
      startDate: new Date('2024-09-10'),
      endDate: new Date('2024-10-10'),
      totalQuestions: 280,
      completedQuestions: 280,
      dailyTarget: 9,
      streak: 0,
      maxStreak: 25,
      status: 'completed',
      difficulty: 'Orta',
      topics: ['Okuma Anlama', 'Paragraf', 'Metin Türleri', 'Anlam Bilgisi'],
      color: 'from-red-500 to-red-600',
      icon: '📚',
      lastStudied: new Date('2024-10-10'),
      createdAt: new Date('2024-09-10'),
      dailyProgress: []
    },
    {
      id: 3,
      courseName: 'Fen Bilimleri',
      bookName: 'Fizik Temelleri',
      author: 'Prof. Dr. Okan Yıldız',
      startDate: new Date('2024-09-20'),
      endDate: new Date('2024-10-25'),
      totalQuestions: 400,
      completedQuestions: 85,
      dailyTarget: 11,
      streak: 5,
      maxStreak: 8,
      status: 'paused',
      difficulty: 'Zor',
      topics: ['Hareket', 'Kuvvet', 'Enerji', 'Isı'],
      color: 'from-green-500 to-green-600',
      icon: '🔬',
      lastStudied: new Date('2024-09-25'),
      createdAt: new Date('2024-09-20'),
      dailyProgress: []
    },
    {
      id: 4,
      courseName: 'Sosyal Bilgiler',
      bookName: 'Coğrafya ve İklim',
      author: 'Dr. Zeynep Arslan',
      startDate: new Date('2024-09-25'),
      endDate: new Date('2024-10-20'),
      totalQuestions: 250,
      completedQuestions: 35,
      dailyTarget: 10,
      streak: 2,
      maxStreak: 2,
      status: 'active',
      difficulty: 'Kolay',
      topics: ['Türkiye Coğrafyası', 'İklim Tipleri', 'Doğal Kaynaklar', 'Nüfus'],
      color: 'from-purple-500 to-purple-600',
      icon: '🌍',
      lastStudied: new Date('2024-09-26'),
      createdAt: new Date('2024-09-25'),
      dailyProgress: []
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'paused': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'completed': return 'Tamamlandı';
      case 'paused': return 'Duraklatıldı';
      default: return 'Bilinmiyor';
    }
  };

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getProgressPercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  const filteredPlans = studyPlans.filter(plan => {
    const matchesFilter = selectedFilter === 'all' || plan.status === selectedFilter;
    const matchesSearch = plan.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.bookName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStreakEmoji = (streak) => {
    if (streak >= 20) return '🔥🔥🔥';
    if (streak >= 10) return '🔥🔥';
    if (streak >= 5) return '🔥';
    return '⭐';
  };

  // Modal fonksiyonları
  const openEditModal = (plan) => {
    setSelectedPlan(plan);
    setEditModalOpen(true);
  };

  const openViewModal = (plan) => {
    setSelectedPlan(plan);
    setViewModalOpen(true);
  };

  const openDeleteModal = (plan) => {
    setSelectedPlan(plan);
    setDeleteModalOpen(true);
  };

  const closeModals = () => {
    setEditModalOpen(false);
    setViewModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedPlan(null);
    setTodayStats({ solved: 0, correct: 0, wrong: 0 });
  };

  const handleSaveStats = () => {
    console.log('Kaydedilen istatistikler:', todayStats);
    closeModals();
  };

  const stats = {
    totalPlans: studyPlans.length,
    activePlans: studyPlans.filter(p => p.status === 'active').length,
    completedPlans: studyPlans.filter(p => p.status === 'completed').length,
    totalStreak: studyPlans.reduce((sum, plan) => sum + plan.streak, 0),
    maxStreak: Math.max(...studyPlans.map(p => p.maxStreak)),
    totalQuestions: studyPlans.reduce((sum, plan) => sum + plan.completedQuestions, 0)
  };

  const floatingElements = [
    { id: 1, size: 'w-16 h-16', position: 'top-20 left-20', delay: '0s' },
    { id: 2, size: 'w-12 h-12', position: 'top-40 right-32', delay: '2s' },
    { id: 3, size: 'w-20 h-20', position: 'bottom-32 left-24', delay: '1s' },
    { id: 4, size: 'w-14 h-14', position: 'bottom-20 right-20', delay: '3s' },
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

      <div className="relative z-10 min-h-screen p-4">
        {/* Header */}
        <div className={`text-center mb-8 lg:mb-12 transition-all duration-1000 ${
          animatedElements ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Planlarım</span>
            </h1>
          </div>
          <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
            Çalışma planlarınızı takip edin ve hedeflerinize ulaşın
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className={`max-w-7xl mx-auto mb-8 transition-all duration-1000 delay-200 ${
          animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalPlans}</div>
                <div className="text-blue-700 text-sm font-medium">Toplam Plan</div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.activePlans}</div>
                <div className="text-green-700 text-sm font-medium">Aktif Plan</div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.completedPlans}</div>
                <div className="text-purple-700 text-sm font-medium">Tamamlanan</div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-2xl font-bold text-orange-600">{stats.maxStreak}</span>
                </div>
                <div className="text-orange-700 text-sm font-medium">En Yüksek Streak</div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.totalQuestions.toLocaleString()}</div>
                <div className="text-red-700 text-sm font-medium">Çözülen Soru</div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span className="text-2xl font-bold text-yellow-600">{stats.totalStreak}</span>
                </div>
                <div className="text-yellow-700 text-sm font-medium">Toplam Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`max-w-7xl mx-auto mb-8 transition-all duration-1000 delay-300 ${
          animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="relative flex-1 lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Plan ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <div className="flex space-x-2">
                  {[
                    { key: 'all', label: 'Tümü', color: 'bg-gray-100 text-gray-700' },
                    { key: 'active', label: 'Aktif', color: 'bg-green-100 text-green-700' },
                    { key: 'completed', label: 'Tamamlanan', color: 'bg-blue-100 text-blue-700' },
                    { key: 'paused', label: 'Duraklatılan', color: 'bg-orange-100 text-orange-700' }
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setSelectedFilter(filter.key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedFilter === filter.key 
                          ? `${filter.color} ring-2 ring-offset-2 ring-orange-500` 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Plans Grid */}
        <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-400 ${
          animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {filteredPlans.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Plan bulunamadı</h3>
              <p className="text-gray-600 mb-6">Arama kriterlerinizle eşleşen plan bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-6 lg:p-8">
                    {/* Plan Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                          {plan.icon}
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{plan.bookName}</h3>
                          <p className="text-gray-600">{plan.courseName} • {plan.author}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(plan.status)}`}>
                              {getStatusText(plan.status)}
                            </span>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              plan.difficulty === 'Kolay' ? 'bg-green-100 text-green-700' :
                              plan.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {plan.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Streak Display */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Flame className={`w-6 h-6 ${plan.streak > 0 ? 'text-orange-500' : 'text-gray-300'}`} />
                          <span className="text-2xl font-bold text-orange-500">{plan.streak}</span>
                        </div>
                        <div className="text-xs text-gray-600">Streak</div>
                        <div className="text-xs text-gray-500">Max: {plan.maxStreak}</div>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">İlerleme</span>
                        <span className="font-semibold text-gray-900">
                          {plan.completedQuestions}/{plan.totalQuestions} soru ({getProgressPercentage(plan.completedQuestions, plan.totalQuestions)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${plan.color} transition-all duration-500`}
                          style={{ width: `${getProgressPercentage(plan.completedQuestions, plan.totalQuestions)}%` }}
                        ></div>
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-bold text-gray-900">{plan.dailyTarget}</div>
                          <div className="text-gray-600 text-xs">Günlük Hedef</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-bold text-gray-900">{getDaysRemaining(plan.endDate)}</div>
                          <div className="text-gray-600 text-xs">Kalan Gün</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-bold text-gray-900">{plan.lastStudied.toLocaleDateString('tr-TR')}</div>
                          <div className="text-gray-600 text-xs">Son Çalışma</div>
                        </div>
                      </div>
                    </div>

                    {/* Topics Preview */}
                    <div className="mb-6">
                      <button
                        onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <h4 className="font-semibold text-gray-900">Konular</h4>
                        {expandedPlan === plan.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      
                      {expandedPlan === plan.id ? (
                        <div className="mt-3 space-y-2">
                          {plan.topics.map((topic, i) => (
                            <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-700">{i + 1}. {topic}</span>
                              <div className="w-16 h-2 bg-gray-200 rounded-full">
                                <div className="w-1/3 h-2 bg-orange-400 rounded-full"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {plan.topics.slice(0, 2).map((topic, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                              {topic}
                            </span>
                          ))}
                          {plan.topics.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg">
                              +{plan.topics.length - 2} konu daha
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        {plan.status === 'active' && (
                          <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        {plan.status === 'paused' && (
                          <button className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors">
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                          onClick={() => openEditModal(plan)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                          onClick={() => openViewModal(plan)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                          onClick={() => openDeleteModal(plan)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        {getStreakEmoji(plan.streak)}
                        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium">
                          Devam Et
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add New Plan Button */}
        <div className="fixed bottom-8 right-8">
          <a href="/home" className="block">
          <button className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
               <Plus className="w-8 h-8" />
          </button>
          </a>
          </div>
      </div>

      {/* Edit Modal - Transparent Background */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/30">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Bugünkü İlerleme</h3>
                <button 
                  onClick={closeModals}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {selectedPlan && (
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center text-white text-lg`}>
                      {selectedPlan.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedPlan.bookName}</h4>
                      <p className="text-gray-600 text-sm">{selectedPlan.courseName}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bugün kaç soru çözdünüz?
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={todayStats.solved}
                        onChange={(e) => setTodayStats({...todayStats, solved: parseInt(e.target.value) || 0})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kaç doğru yaptınız?
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={todayStats.solved}
                        value={todayStats.correct}
                        onChange={(e) => setTodayStats({...todayStats, correct: parseInt(e.target.value) || 0})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kaç yanlış yaptınız?
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={todayStats.solved}
                        value={todayStats.wrong}
                        onChange={(e) => setTodayStats({...todayStats, wrong: parseInt(e.target.value) || 0})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="0"
                      />
                    </div>
                    
                    {todayStats.solved > 0 && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">
                            Başarı Oranı: {todayStats.correct > 0 ? Math.round((todayStats.correct / todayStats.solved) * 100) : 0}%
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {todayStats.correct} doğru / {todayStats.wrong} yanlış
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  onClick={closeModals}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveStats}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal - Transparent Background */}
      {viewModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/30">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Plan Detayları</h3>
                <button 
                  onClick={closeModals}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {selectedPlan && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center text-white text-2xl`}>
                      {selectedPlan.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{selectedPlan.bookName}</h4>
                      <p className="text-gray-600">{selectedPlan.courseName} • {selectedPlan.author}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(selectedPlan.status)}`}>
                          {getStatusText(selectedPlan.status)}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          selectedPlan.difficulty === 'Kolay' ? 'bg-green-100 text-green-700' :
                          selectedPlan.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {selectedPlan.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{selectedPlan.dailyTarget}</div>
                      <div className="text-gray-600 text-sm">Günlük Hedef</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{getDaysRemaining(selectedPlan.endDate)}</div>
                      <div className="text-gray-600 text-sm">Kalan Gün</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-500">{selectedPlan.streak}</div>
                      <div className="text-gray-600 text-sm">Mevcut Streak</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">{selectedPlan.maxStreak}</div>
                      <div className="text-gray-600 text-sm">En Yüksek Streak</div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Konular</h5>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      {selectedPlan.topics.map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">{topic}</span>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="w-1/3 h-2 bg-orange-400 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">İlerleme</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tamamlanan Sorular</span>
                        <span className="font-semibold">
                          {selectedPlan.completedQuestions}/{selectedPlan.totalQuestions} ({getProgressPercentage(selectedPlan.completedQuestions, selectedPlan.totalQuestions)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${selectedPlan.color}`}
                          style={{ width: `${getProgressPercentage(selectedPlan.completedQuestions, selectedPlan.totalQuestions)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal - Transparent Background */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-3xl shadow-2xl max-w-md w-full border border-white/30">
            <div className="p-6 lg:p-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Planı Sil</h3>
                <p className="text-gray-600 mb-6">
                  {selectedPlan?.bookName} planını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={closeModals}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  İptal
                </button>
                <button
                  onClick={closeModals}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}