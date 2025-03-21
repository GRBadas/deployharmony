
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { StaggeredContainer, StaggeredItem } from '@/components/AnimatedTransition';
import { ArrowRight, CheckCircle, Zap, Shield, BarChart } from 'lucide-react';
import { Button } from "@/components/ui/button";

const heroFeatures = [
  { icon: <CheckCircle className="w-5 h-5" />, text: "Intuitive task management" },
  { icon: <Zap className="w-5 h-5" />, text: "Lightning fast performance" },
  { icon: <Shield className="w-5 h-5" />, text: "Enterprise-grade security" },
  { icon: <BarChart className="w-5 h-5" />, text: "Powerful analytics" },
];

const FadeInSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  return (
    <Layout className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute top-0 inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-1/2 h-1/2 bg-gradient-to-br from-primary/10 to-accent/20 rounded-full blur-3xl opacity-60 -z-10" />
        </div>
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <StaggeredContainer className="space-y-6">
              <StaggeredItem>
                <span className="inline-block px-3 py-1 bg-accent text-primary rounded-full text-sm font-medium mb-4">
                  Introducing Zenith
                </span>
              </StaggeredItem>
              
              <StaggeredItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6">
                  Simplify your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">workflow</span>
                </h1>
              </StaggeredItem>
              
              <StaggeredItem>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Zenith helps teams move work forward. Collaborate, manage projects, and reach new productivity peaks.
                </p>
              </StaggeredItem>
              
              <StaggeredItem>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/dashboard">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 transition ease-in-out duration-300 hover:shadow-lg hover:shadow-primary/25"
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/tasks">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 border border-border hover:bg-accent transition ease-in-out duration-300"
                    >
                      View Demo
                    </Button>
                  </Link>
                </div>
              </StaggeredItem>
              
              <StaggeredItem>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto mt-8">
                  {heroFeatures.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-background/60 backdrop-blur-sm border border-border/50 rounded-lg p-2 md:p-3"
                    >
                      <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-accent/50 text-primary flex-shrink-0">
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </StaggeredItem>
            </StaggeredContainer>
            
            <div className="perspective-container mt-16 w-full max-w-5xl mx-auto">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="preserve-3d w-full relative"
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/30 hover:shadow-primary/5 transition-all duration-500">
                  <img 
                    src="https://assets.website-files.com/64f4f7986ecb11d1255575bb/6511557aa60d23ed2da97197_Frame%201.svg" 
                    alt="Zenith Dashboard Preview" 
                    className="w-full h-auto"
                  />
                </div>
                
                <div 
                  className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-500 blur-2xl opacity-40"
                  style={{ zIndex: -1 }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-accent/50">
        <div className="container mx-auto px-6">
          <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-semibold mb-6">Designed for modern teams</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to manage your projects, organize your tasks, and collaborate with your team.
            </p>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Project Management",
                description: "Plan, track, and manage your projects with ease. Set milestones, deadlines, and visualize progress.",
                icon: <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 14V10H3V14M18 19H6M12 19V10M12 5H8V10H12V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              },
              {
                title: "Task Tracking",
                description: "Create, assign, and prioritize tasks. Track progress in real-time and never miss a deadline.",
                icon: <div className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 p-3 rounded-xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              },
              {
                title: "Team Collaboration",
                description: "Collaborate seamlessly with your team. Share updates, discuss ideas, and work together.",
                icon: <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              }
            ].map((feature, index) => (
              <FadeInSection 
                key={index} 
                delay={index * 0.1} 
                className="glass-card p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-blue-600/90 py-16 px-8 md:px-16 text-white">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="max-w-2xl mb-10 md:mb-0">
                <FadeInSection>
                  <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to transform your workflow?</h2>
                  <p className="text-lg text-white/80">
                    Join thousands of teams that use Zenith to streamline their projects and boost productivity.
                  </p>
                </FadeInSection>
              </div>
              
              <FadeInSection delay={0.2}>
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 rounded-full px-8 transition ease-in-out duration-300 hover:shadow-lg"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
