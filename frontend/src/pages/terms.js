import React, { useState, useEffect } from 'react';
import { FiShield, FiFileText, FiUser, FiCreditCard, FiRefreshCw, FiAward, FiGlobe, FiAlertTriangle, FiBook, FiX, FiDownload, FiPrinter } from 'react-icons/fi';
import Head from 'next/head';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('acceptance');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a simple text version for download
    const content = document.querySelector('.terms-content').innerText;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Venuity-Terms-of-Service.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const sections = [
    { 
      id: 'acceptance', 
      title: 'Acceptance of Terms', 
      icon: FiBook,
      content: `By accessing or using the Venuity mobile application and website (the "Platform"), you agree to be bound by these Terms and Agreements (the "Terms") and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Platform. These Terms apply to Clients (users booking venues and services) and Vendors (Venue Owners and Service Providers offering services).`
    },
    { 
      id: 'role', 
      title: 'Venuity\'s Role as a Marketplace Intermediary', 
      icon: FiGlobe,
      content: `Venuity is solely a technology platform and marketplace. We provide a venue for Clients and Vendors to meet, negotiate, and enter into contracts for event space rental and related services.

Venuity is NOT:
• A party to the service or rental contract between the Client and the Vendor/Venue.
• The owner, operator, or manager of any Venue listed on the Platform.
• A Service Provider (Caterer, Decorator, Planner, etc.) itself.
• Liable for the quality, safety, legality, or suitability of any services provided by Vendors or Venues.
• Any agreements, service deliveries, cancellations, or disputes are solely between the Client and the respective Vendor or Venue.`
    },
    { 
      id: 'account', 
      title: 'Account Registration and Eligibility', 
      icon: FiUser,
      content: `**i. Eligibility:**
You must be at least thirteen (13) years old to create an account and use the Platform.

**ii. Account Responsibility:**
You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify Venuity immediately of any unauthorized use.

**iii. Vendor Vetting:**
Vendors must complete a detailed registration process and meet Venuity's vetting criteria, which may include providing insurance, licenses, and references. Venuity reserves the right to remove any Vendor at its sole discretion.`
    },
    { 
      id: 'booking', 
      title: 'Booking, Contracts, and Payment', 
      icon: FiCreditCard,
      content: `**i. Binding Booking:**
All bookings confirmed through the Platform (via digital signature or final deposit payment) constitute a legally binding contract between the Client and the Vendor/Venue.

**ii. Payment Processing (Escrow):**
All payments, including deposits, are processed securely through Venuity. Funds for the final payment are held in an escrow-like account until the services are successfully rendered and confirmed by both parties.

**iii. Venuity Commission (Take Rate):**
Venuity retains a pre-agreed commission (the "Take Rate") from the total booking value. This commission is deducted before funds are disbursed to the Vendor. Vendors agree to this deduction as compensation for platform usage and client acquisition.

**iv. Payout to Vendors:**
• Deposit/Advance: The Vendor's share of the initial deposit (net of commission) will be paid within a specified number of business days following receipt of the Client's deposit.
• Final Balance: The remaining balance (net of final commission) will be released to the Vendor within a specified period (e.g., 2-5 business days) after the event date, contingent upon Client confirmation that services were satisfactorily rendered.`
    },
    { 
      id: 'cancellation', 
      title: 'Cancellation and Refund Policy', 
      icon: FiRefreshCw,
      content: `**i. Governing Policy:**
All cancellations and refund eligibility are governed solely by the individual cancellation policy set by the specific Venue or Vendor as listed on their Venuity profile and included in the final booking contract.

**ii. Venuity's Role:**
Venuity processes the refund transaction based on the Vendor's policy but is not responsible for the Vendor's refusal to grant a refund outside of their stated policy. Any dispute must be resolved directly between the Client and Vendor.`
    },
    { 
      id: 'flex-vendor', 
      title: 'Venuity Advantage and Flex Vendor Policy', 
      icon: FiAward,
      content: `**i. Venuity Advantages:**
Complimentary services (e.g., extra waiter staff, planning consultation) are offered as non-monetary bonuses and may be adjusted or removed by Venuity at any time without prior notice.

**ii. Flex Vendor Option (Bring Your Own):**
Clients may be permitted to contract certain services (e.g., catering, decoration) outside of the Venuity network. This option is subject to the Venue's approval.

**iii. Flex Fee Vendor:**
If a Client elects to use a Flex Vendor, Venuity will charge a non-refundable Flex Fee (e.g., 2% of the Venue rental price) to the Client. This fee compensates Venuity for platform resources used to facilitate the outside vendor's integration and insurance verification.

**iv. Vendor Passport & Verification:**
All Flex Vendors must submit a "Vendor Passport" (including proof of insurance, licensing, and liability waiver) to Venuity for verification prior to the event. The Venue reserves the right to deny entry to any Flex Vendor who fails this verification.`
    },
    { 
      id: 'user-conduct', 
      title: 'User Conduct and Content', 
      icon: FiFileText,
      content: `**i. Prohibited Conduct:**
Users shall not upload content that is illegal, misleading, defamatory, or infringes on the intellectual property rights of others.

**ii. Reviews and Ratings:**
Clients agree that Venuity has the right, but not the obligation, to monitor, edit, or remove reviews and ratings that Venuity deems inappropriate, offensive, or fraudulent.

**iii. Venuity License:**
By submitting content (reviews, photos) to the Platform, you grant Venuity a worldwide, royalty-free, perpetual license to use, reproduce, and display that content in connection with the Platform's marketing and operation.`
    },
    { 
      id: 'liability', 
      title: 'Limitation of Liability and Indemnification', 
      icon: FiShield,
      content: `**i. Limitation of Liability:**
To the maximum extent permitted by law, Venuity shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the Platform or your inability to use the Platform, or the conduct of any Client or Vendor.

**ii. Indemnification:**
You agree to indemnify and hold Venuity harmless from any and all claims, demands, liabilities, damages, and expenses (including attorneys' fees) arising out of or in connection with: (a) your breach of these Terms; (b) your violation of any law or the rights of a third party; or (c) your booking or provision of any services obtained through the Platform.`
    },
    { 
      id: 'governing-law', 
      title: 'Governing Law', 
      icon: FiBook,
      content: `These Terms shall be governed by the laws of [INDIA], without regard to its conflict of law provisions.`
    },
    { 
      id: 'termination', 
      title: 'Termination', 
      icon: FiX,
      content: `Venuity may terminate your access to the Platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

For questions or concerns regarding these Terms, please contact us at [support@venuity.in].`
    },
    { 
      id: 'license', 
      title: 'License Grant and Restrictions', 
      icon: FiShield,
      content: `**3.1. Venuity's License Grant to Users:**
Venuity hereby grants you (the Client or Vendor), subject to these Terms, a limited, non-exclusive, non-transferable, non-sublicensable, and revocable license to access and use the Platform solely for your personal and commercial use in accordance with the stated purpose of Venuity: booking and managing event venues and related services.

**3.2. User's License Grant to Venuity:**
By submitting, posting, or uploading any content, data, event details, photos, or reviews ("User Content") to the Platform, you grant Venuity a worldwide, royalty-free, perpetual, irrevocable, transferable, and sub-licensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, publicly perform, and publicly display such User Content in connection with the operation, promotion, and improvement of the Platform and Venuity's business. This includes, without limitation, the use of Vendor and Venue details for marketing and client acquisition.

**3.3. License Restrictions:**
You agree not to do, or permit any third party to do, any of the following:

**i. Copy or Modify:**
Reproduce, modify, adapt, translate, or create derivative works of the Platform or any part thereof.

**ii. Reverse Engineer:**
Reverse engineer, decompile, or otherwise attempt to discover the source code or underlying structure, ideas, or algorithms of the Platform.

**iii. Rent or Sell:**
Rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer, or otherwise make available the Platform or any features of the Platform to any third party.

**iv. Circumvent Payment:**
Use the Platform to connect with a Venue or Vendor and then complete the booking or payment transaction entirely outside the Platform to circumvent Venuity's commission fee. Any such circumvention may result in immediate account termination and financial penalties.

**v. Data Harvesting:**
Use any automated system or software to extract data (scraping) from the Platform for commercial or non-commercial purposes without explicit written consent from Venuity.`
    }
  ];

  return (
    <>
      <Head>
        <title>Terms of Service - Venuity</title>
        <meta name="description" content="Venuity Platform Terms of Service" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
          }
          .print-only { display: none; }
        `}</style>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Bokeh Effect Header */}
        <div className="relative h-32 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-8 w-24 h-24 bg-green-400 rounded-full blur-3xl"></div>
            <div className="absolute top-8 right-12 w-32 h-32 bg-emerald-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/3 w-28 h-28 bg-teal-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-4 right-1/4 w-20 h-20 bg-green-300 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <img 
              src="/images/logo.png" 
              alt="Venuity Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        {/* Last Updated Badge & Actions */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                Last Updated: April 2026
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiPrinter className="mr-2" />
                Print
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiDownload className="mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sticky Sidebar Navigation - Desktop Only */}
            {!isMobile && (
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-2 no-print">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                            activeSection === section.id
                              ? 'bg-green-100 text-green-700 font-semibold'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm truncate">{section.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-[32px] shadow-2xl overflow-hidden">
                <div className="p-8 sm:p-12">
                  {/* Header */}
                  <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
                      Venuity Platform Terms of Service
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">
                      Effective Date: October 16, 2025
                    </p>
                  </div>

                  {/* Terms Content */}
                  <div className="terms-content space-y-12">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <section 
                          key={section.id} 
                          id={section.id}
                          className="scroll-mt-32"
                        >
                          <div className="flex items-start space-x-4 mb-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {section.title}
                              </h2>
                            </div>
                          </div>
                          
                          <div className="prose prose-lg max-w-none">
                            <div 
                              className="text-gray-700 leading-relaxed space-y-4"
                              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                              dangerouslySetInnerHTML={{ 
                                __html: section.content
                                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-green-700 font-semibold">$1</strong>')
                                  .replace(/•/g, '<div class="flex items-start space-x-2 mt-3"><span class="text-green-600 mt-1">•</span><span>')
                                  .replace(/\n\n/g, '</span></div><div class="flex items-start space-x-2 mt-3"><span class="text-green-600 mt-1">•</span><span>')
                                  .replace(/\n/g, '<br />')
                                  + '</span></div>'
                              }}
                            />
                          </div>

                          {/* Section Divider */}
                          <div className="mt-12 border-t border-gray-200"></div>
                        </section>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="mt-16 pt-8 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500">
                      2026 Venuity. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 no-print">
            <div className="max-h-32 overflow-y-auto">
              <div className="p-4 space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Quick Navigation
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {sections.slice(0, 6).map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-green-100 text-green-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{section.title.replace(/^\d+\.\s*/, '')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TermsOfService;
