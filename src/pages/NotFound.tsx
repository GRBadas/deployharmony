
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Layout } from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg"
        >
          <div className="mb-8 relative">
            <div className="text-9xl font-bold text-primary opacity-10">404</div>
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                Page Not Found
              </span>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground mb-10">
            We couldn't find the page you were looking for. It might have been moved, deleted, or never existed.
          </p>
          
          <Link to="/">
            <Button size="lg" className="rounded-full px-8">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
