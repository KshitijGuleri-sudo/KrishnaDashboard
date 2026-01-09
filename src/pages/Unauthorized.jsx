/**
 * Unauthorized Page
 */

import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-green via-royal-brown to-royal-green-dark flex items-center justify-center p-4">
      <div className="text-center">
        <ShieldAlert className="w-24 h-24 text-royal-gold mx-auto mb-6" />
        <h1 className="font-elegant text-4xl font-bold text-royal-gold mb-4">
          Access Denied
        </h1>
        <p className="text-royal-cream/80 mb-8">
          You don't have permission to access this page.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-8 py-3 bg-gradient-to-r from-royal-gold to-royal-gold-light text-royal-green-dark font-semibold rounded-lg hover:shadow-gold transition-all"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
