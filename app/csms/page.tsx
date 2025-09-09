"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Beaker,
  Brain,
  Database,
  BarChart3,
  Cpu,
  Search,
  Microscope,
  FlaskConical,
  TestTube,
  Atom,
} from "lucide-react"

export default function CSMSPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Laboratory theme background image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/modern-chemical-laboratory-with-safety-equipment.png')",
        }}
      />

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-white/60" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gray-400 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-gray-400 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 border border-gray-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-orange-400 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 border border-orange-300 rounded-full"></div>
        {/* Molecular connections */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="rgba(100,100,100,0.2)" strokeWidth="1" />
          <line x1="70%" y1="15%" x2="85%" y2="25%" stroke="rgba(100,100,100,0.2)" strokeWidth="1" />
          <line x1="20%" y1="80%" x2="40%" y2="60%" stroke="rgba(255,140,0,0.3)" strokeWidth="1" />
        </svg>
      </div>

      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center max-w-5xl mx-auto">
          {/* OILSERV Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-4 bg-gray-100/80 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray-200 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-3 w-3 bg-orange-500 rounded-sm"></div>
                  <div className="h-3 w-3 bg-orange-500 rounded-sm"></div>
                  <div className="h-3 w-3 bg-orange-500 rounded-sm"></div>
                  <div className="h-3 w-3 bg-orange-500 rounded-sm"></div>
                </div>
                <span className="text-orange-500 font-bold text-3xl">OILSERV</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Microscope className="w-6 h-6" />
                <FlaskConical className="w-6 h-6" />
                <TestTube className="w-6 h-6" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-gray-900 leading-tight">
            Intelligent
            <br />
            <span className="text-orange-500">Chemical Safety</span>
            <br />
            Management
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            Comprehensive chemical safety solutions with GHS compliance and NFPA integration
          </p>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">Core Safety Management Features</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive chemical safety solutions with advanced laboratory integration and AI-powered analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Risk Assessment */}
            <Card className="bg-white/90 backdrop-blur-lg border border-gray-200 hover:border-orange-400/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-orange-500/20 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/20 rounded-bl-full flex items-center justify-center">
                <Badge className="bg-orange-500/30 text-orange-700 text-xs backdrop-blur-sm">GHS</Badge>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-orange-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30 transition-colors border border-orange-400/30">
                  <Brain className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">AI Risk Assessment</CardTitle>
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  Advanced machine learning algorithms analyze molecular structures and predict chemical hazards with
                  99.9% accuracy. Integrated with GHS classification and NFPA diamond systems.
                </CardDescription>
                <div className="flex items-center mt-6 text-sm text-orange-600">
                  <Atom className="h-4 w-4 mr-2" />
                  Molecular hazard analysis
                </div>
              </CardHeader>
            </Card>

            {/* Smart Automation */}
            <Card className="bg-white/90 backdrop-blur-lg border border-gray-200 hover:border-orange-400/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-bl-full flex items-center justify-center">
                <Badge className="bg-blue-500/30 text-blue-700 text-xs backdrop-blur-sm">AUTO</Badge>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors border border-blue-400/30">
                  <Cpu className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">Smart Automation</CardTitle>
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  Automated SDS generation, GHS-compliant label creation, and real-time compliance monitoring.
                  Seamlessly integrates with laboratory equipment and inventory systems.
                </CardDescription>
                <div className="flex items-center mt-6 text-sm text-blue-600">
                  <FlaskConical className="h-4 w-4 mr-2" />
                  Laboratory integration
                </div>
              </CardHeader>
            </Card>

            {/* Predictive Analytics */}
            <Card className="bg-white/90 backdrop-blur-lg border border-gray-200 hover:border-orange-400/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/20 rounded-bl-full flex items-center justify-center">
                <Badge className="bg-green-500/30 text-green-700 text-xs backdrop-blur-sm">PRED</Badge>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-green-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors border border-green-400/30">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">Predictive Analytics</CardTitle>
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  Advanced forecasting models predict safety incidents and recommend preventive measures. NFPA diamond
                  integration provides comprehensive hazard visualization and risk assessment.
                </CardDescription>
                <div className="flex items-center mt-6 text-sm text-green-600">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Incident prediction
                </div>
              </CardHeader>
            </Card>

            {/* Real-time Monitoring */}
            <Card className="bg-white/90 backdrop-blur-lg border border-gray-200 hover:border-orange-400/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-red-500/20 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/20 rounded-bl-full flex items-center justify-center">
                <Badge className="bg-red-500/30 text-red-700 text-xs backdrop-blur-sm">24/7</Badge>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-red-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500/30 transition-colors border border-red-400/30">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">Real-time Monitoring</CardTitle>
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  Continuous safety monitoring with instant alerts and automated emergency response protocols. IoT
                  sensor integration provides comprehensive laboratory environment coverage.
                </CardDescription>
                <div className="flex items-center mt-6 text-sm text-red-600">
                  <Shield className="h-4 w-4 mr-2" />
                  Continuous monitoring
                </div>
              </CardHeader>
            </Card>

            {/* Intelligent Database */}
            <Card className="bg-white/90 backdrop-blur-lg border border-gray-200 hover:border-orange-400/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 rounded-bl-full flex items-center justify-center">
                <Badge className="bg-purple-500/30 text-purple-700 text-xs backdrop-blur-sm">AI DB</Badge>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors border border-purple-400/30">
                  <Database className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">Intelligent Database</CardTitle>
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  AI-curated chemical database with automatic updates and cross-referencing capabilities. Comprehensive
                  molecular structure analysis and chemical inventory management.
                </CardDescription>
                <div className="flex items-center mt-6 text-sm text-purple-600">
                  <Search className="h-4 w-4 mr-2" />
                  Smart molecular search
                </div>
              </CardHeader>
            </Card>

            {/* Lab Integration */}
            <Card className="bg-white/90 backdrop-blur-lg border border-gray-200 hover:border-orange-400/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-teal-500/20 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/20 rounded-bl-full flex items-center justify-center">
                <Badge className="bg-teal-500/30 text-teal-700 text-xs backdrop-blur-sm">IOT</Badge>
              </div>
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-teal-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500/30 transition-colors border border-teal-400/30">
                  <Beaker className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 mb-4">Lab Integration</CardTitle>
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  Seamless integration with laboratory equipment, analytical instruments, and IoT sensors. Real-time
                  data collection, analysis, and automated safety protocol activation.
                </CardDescription>
                <div className="flex items-center mt-6 text-sm text-teal-600">
                  <Microscope className="h-4 w-4 mr-2" />
                  Equipment integration
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
