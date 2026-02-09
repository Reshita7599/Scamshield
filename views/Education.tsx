
import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Article, Flashcard } from '../types';

export const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'flashcards'>('articles');
  
  const articles: Article[] = [
    {
      id: 1,
      title: "The Rise of AI-Powered Phishing",
      excerpt: "Attackers are using LLMs to craft perfect emails. Learn how to spot the subtle signs of AI-generated social engineering.",
      date: "2023-10-24",
      category: "News",
      readTime: "5 min",
      url: "https://www.wired.com/story/ai-phishing-emails/"
    },
    {
      id: 2,
      title: "Zero Trust Architecture Explained",
      excerpt: "Why 'never trust, always verify' is becoming the industry standard for network security in corporate environments.",
      date: "2023-10-20",
      category: "Best Practice",
      readTime: "8 min",
      url: "https://www.nist.gov/publications/zero-trust-architecture"
    },
    {
      id: 3,
      title: "OWASP Top 10 Vulnerabilities",
      excerpt: "A deep dive into the most critical web application security risks, including Injection and Broken Access Control.",
      date: "2023-10-15",
      category: "Exploit",
      readTime: "12 min",
      url: "https://owasp.org/www-project-top-ten/"
    },
    {
      id: 4,
      title: "Ransomware: Prevention and Response",
      excerpt: "CISA's official guide on how to protect your organization from ransomware attacks and what to do if you are hit.",
      date: "2023-11-01",
      category: "Best Practice",
      readTime: "10 min",
      url: "https://www.cisa.gov/stopransomware"
    },
    {
      id: 5,
      title: "The Dark Web: What You Need to Know",
      excerpt: "Understanding the difference between the Deep Web and the Dark Web, and how data breaches end up for sale.",
      date: "2023-09-28",
      category: "News",
      readTime: "6 min",
      url: "https://www.csoonline.com/article/564344/what-is-the-dark-web-how-to-access-it-and-what-youll-find.html"
    },
    {
      id: 6,
      title: "SQL Injection (SQLi) Prevention",
      excerpt: "Technical guide on using prepared statements and parameterized queries to stop one of the oldest web hacks.",
      date: "2023-10-05",
      category: "Exploit",
      readTime: "15 min",
      url: "https://portswigger.net/web-security/sql-injection"
    }
  ];

  const flashcards: Flashcard[] = [
    { id: 1, category: "Network", question: "What is port 443 used for?", answer: "HTTPS (Hypertext Transfer Protocol Secure) - Encrypted web traffic." },
    { id: 2, category: "Attack", question: "What does XSS stand for?", answer: "Cross-Site Scripting - Injecting malicious scripts into trusted websites." },
    { id: 3, category: "Defense", question: "What is 2FA?", answer: "Two-Factor Authentication - Requiring two forms of identification (e.g., password + code)." },
    { id: 4, category: "Concept", question: "What is the CIA Triad?", answer: "Confidentiality, Integrity, Availability - The three pillars of information security." },
    { id: 5, category: "Malware", question: "What is Ransomware?", answer: "Malware that encrypts files and demands payment (crypto) for the decryption key." },
    { id: 6, category: "Attack", question: "What is Phishing?", answer: "Sending fraudulent communications that appear to come from a reputable source to steal data." },
    { id: 7, category: "Network", question: "What is a DDoS attack?", answer: "Distributed Denial of Service - Overwhelming a target with traffic from multiple sources to shut it down." },
    { id: 8, category: "Defense", question: "What is a VPN?", answer: "Virtual Private Network - Encrypts your internet connection to hide your online actions and location." },
    { id: 9, category: "Defense", question: "What is a Firewall?", answer: "A network security device that monitors and controls incoming/outgoing traffic based on security rules." },
    { id: 10, category: "Attack", question: "What is a Zero-Day exploit?", answer: "An attack that targets a software vulnerability which is unknown to the software vendor or has no patch." },
    { id: 11, category: "Malware", question: "What is a Trojan Horse?", answer: "Malicious software that disguises itself as a legitimate application to trick users into loading it." },
    { id: 12, category: "Attack", question: "What is Social Engineering?", answer: "Manipulating people into giving up confidential information (human hacking)." },
    { id: 13, category: "Concept", question: "What is Hashing?", answer: "Converting data into a fixed-length string of characters (digest). It is one-way (cannot be reversed)." },
    { id: 14, category: "Attack", question: "What is Brute Force?", answer: "A trial-and-error method used to guess login information/encryption keys by trying every combination." },
    { id: 15, category: "Attack", question: "What is Man-in-the-Middle (MitM)?", answer: "An attacker secretly intercepts and relays communications between two parties who believe they are communicating directly." },
    { id: 16, category: "Defense", question: "What is Salting?", answer: "Adding random data to a password before hashing it to protect against rainbow table attacks." },
    { id: 17, category: "Malware", question: "What is a Keylogger?", answer: "Spyware that records every keystroke made by a user to steal passwords and messages." },
    { id: 18, category: "Concept", question: "What is Air Gapping?", answer: "Physically isolating a secure network from other unsecured networks (like the public Internet)." },
    { id: 19, category: "Network", question: "What is a Botnet?", answer: "A network of private computers infected with malicious software and controlled as a group without the owners' knowledge." },
    { id: 20, category: "Defense", question: "What is Penetration Testing?", answer: "An authorized simulated cyberattack on a computer system, performed to evaluate the security of the system." },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentCardIndex((prev) => (prev + 1) % flashcards.length), 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length), 200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Knowledge Base</h2>
          <p className="text-gray-400">Stay informed on the latest threats and terminology.</p>
        </div>
        <div className="flex space-x-2 bg-gray-900 p-1 rounded-lg border border-gray-800">
          <button 
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'articles' ? 'bg-cyber-gray text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Articles
          </button>
          <button 
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'flashcards' ? 'bg-cyber-gray text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Flashcards
          </button>
        </div>
      </div>

      {activeTab === 'articles' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <a 
              key={article.id} 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-cyber-dark border border-gray-800 rounded-xl overflow-hidden hover:border-cyber-neon/50 transition-all group cursor-pointer hover:shadow-[0_0_15px_rgba(0,255,65,0.1)] hover:-translate-y-1"
            >
              <div className="h-1 bg-cyber-neon w-0 group-hover:w-full transition-all duration-500"></div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4 text-xs font-mono text-gray-500">
                  <span className="text-cyber-blue px-2 py-0.5 rounded bg-cyber-blue/10 border border-cyber-blue/20">{article.category.toUpperCase()}</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-neon transition-colors">{article.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                  <div className="flex items-center">
                    <BookOpen size={14} className="mr-2" /> {article.readTime} READ
                  </div>
                  <div className="flex items-center text-cyber-neon opacity-0 group-hover:opacity-100 transition-opacity">
                    READ_ARTICLE <ExternalLink size={12} className="ml-1" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative w-full max-w-xl h-80 perspective-1000">
             <div 
              className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
             >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-cyber-dark border-2 border-gray-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-gray-600 transition-colors">
                   <div className="text-cyber-blue font-mono text-sm mb-4 tracking-widest uppercase border-b border-gray-700 pb-1">{flashcards[currentCardIndex].category}</div>
                   <h3 className="text-2xl font-bold text-white">{flashcards[currentCardIndex].question}</h3>
                   <div className="absolute bottom-6 text-gray-500 text-xs flex items-center animate-pulse">
                      <HelpCircle size={14} className="mr-2" /> Click to decrypt answer
                   </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-900 border-2 border-cyber-neon rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,255,65,0.1)]">
                   <h3 className="text-xl font-bold text-cyber-neon mb-4 tracking-widest border-b border-gray-800 pb-2 w-full">DECRYPTED DATA</h3>
                   <p className="text-gray-200 text-lg leading-relaxed">{flashcards[currentCardIndex].answer}</p>
                </div>
             </div>
          </div>

          <div className="flex items-center space-x-8 mt-10">
            <button onClick={prevCard} className="p-3 rounded-full bg-gray-800 border border-gray-700 text-white hover:bg-cyber-neon hover:text-black hover:border-cyber-neon hover:scale-110 transition-all">
                <ChevronLeft size={24} />
            </button>
            <div className="font-mono text-cyber-neon bg-gray-900 px-4 py-1 rounded border border-gray-800">
                {String(currentCardIndex + 1).padStart(2, '0')} / {String(flashcards.length).padStart(2, '0')}
            </div>
            <button onClick={nextCard} className="p-3 rounded-full bg-gray-800 border border-gray-700 text-white hover:bg-cyber-neon hover:text-black hover:border-cyber-neon hover:scale-110 transition-all">
                <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
