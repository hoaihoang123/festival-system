
import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} Party Planning System. Tất cả quyền được bảo lưu.
          </div>

          {/* Quick links */}
          <div className="flex items-center space-x-6 text-sm">
            <Link 
              to="/help" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Trợ giúp
            </Link>
            <Link 
              to="/privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Bảo mật
            </Link>
            <Link 
              to="/terms" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Điều khoản
            </Link>
          </div>

          {/* Version info */}
          <div className="text-sm text-muted-foreground">
            Phiên bản 1.0.0
          </div>
        </div>
      </div>
    </footer>
  );
}
