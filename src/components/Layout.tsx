
import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { AnimatedTransition } from './AnimatedTransition';

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className={`flex-1 pt-24 pb-12 ${className}`}>
        <AnimatedTransition>
          {children}
        </AnimatedTransition>
      </main>
      <footer className="py-6 border-t border-border/40 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-blue-400 rounded-md" />
              <span className="font-medium">Badas</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>© 2025 Badas. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
