
import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, User as UserIcon, Bot, Send, Clock, AlertCircle } from 'lucide-react';
import { CommunityPost, User } from '../types';
import { generateCommunityReply } from '../services/geminiService';

interface CommunityProps {
  user: User | null;
}

export const Community: React.FC<CommunityProps> = ({ user }) => {
  // Initial Mock Data with 'likedBy' arrays
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 1,
      author: "Alex_CyberSafe",
      avatar: "A",
      content: "Just got a weird text claiming my Netflix account was suspended. The link looked like 'netflix-support-verify.com'. Almost clicked it but checked the URL scanner here first. Be careful guys!",
      timestamp: "2 hours ago",
      likedBy: ['SarahJ', 'Mike_Sec', 'TrollBot'],
      tags: ["Phishing", "SMS", "Awareness"],
      comments: [
        { id: 101, author: "ScamShield AI", content: "Great catch! That is a classic 'smishing' attack. Official services rarely send urgent links via SMS without prior context.", timestamp: "2 hours ago", isAi: true },
        { id: 102, author: "SarahJ", content: "Same thing happened to me last week. Blocked the number immediately.", timestamp: "1 hour ago", isAi: false }
      ]
    },
    {
      id: 2,
      author: "DevOps_Mike",
      avatar: "M",
      content: "Has anyone analyzed the new ransomware variant targeting healthcare institutions? I'm trying to find IOCs (Indicators of Compromise) to update our firewalls.",
      timestamp: "5 hours ago",
      likedBy: ['Alex_CyberSafe'],
      tags: ["Ransomware", "ThreatIntel", "Healthcare"],
      comments: []
    },
    {
      id: 3,
      author: "NewbieSec",
      avatar: "N",
      content: "What is the best way to secure my home router? I changed the default password, but what else should I do?",
      timestamp: "1 day ago",
      likedBy: [],
      tags: ["HomeSecurity", "Router", "Help"],
      comments: [
         { id: 103, author: "ScamShield AI", content: "Excellent start! Also consider disabling WPS (Wi-Fi Protected Setup), enabling WPA3 encryption if available, and updating the firmware regularly.", timestamp: "1 day ago", isAi: true }
      ]
    }
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  
  // State to track comment input for each post: Map<PostId, CommentText>
  const [commentInputs, setCommentInputs] = useState<{[key: number]: string}>({});

  const handlePost = async () => {
    if (!user) return;
    if (!newPostContent.trim()) return;

    setIsPosting(true);
    
    // Create User Post
    const newPost: CommunityPost = {
      id: Date.now(),
      author: user.username,
      avatar: user.avatar,
      content: newPostContent,
      timestamp: "Just now",
      likedBy: [],
      tags: ["General"],
      comments: []
    };

    // Add to list immediately
    setPosts(prev => [newPost, ...prev]);
    setNewPostContent('');

    // Trigger AI Reply
    try {
        const aiReplyText = await generateCommunityReply(newPostContent);
        const aiComment = {
            id: Date.now() + 1,
            author: "ScamShield AI",
            content: aiReplyText,
            timestamp: "Just now",
            isAi: true
        };
        
        // Update the specific post with AI comment
        setPosts(prev => prev.map(p => 
            p.id === newPost.id 
            ? { ...p, comments: [aiComment, ...p.comments] }
            : p
        ));
    } catch (error) {
        console.error("AI Reply failed", error);
    } finally {
        setIsPosting(false);
    }
  };

  const handleLike = (postId: number) => {
    if (!user) return; // Prevent guests from liking

    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;

      const hasLiked = post.likedBy.includes(user.username);
      let newLikedBy;

      if (hasLiked) {
        // Unlike: Remove username
        newLikedBy = post.likedBy.filter(u => u !== user.username);
      } else {
        // Like: Add username
        newLikedBy = [...post.likedBy, user.username];
      }

      return { ...post, likedBy: newLikedBy };
    }));
  };

  const handleCommentChange = (postId: number, text: string) => {
    setCommentInputs(prev => ({ ...prev, [postId]: text }));
  };

  const handleSubmitComment = (postId: number) => {
    if (!user) return;
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const newComment = {
      id: Date.now(),
      author: user.username,
      content: text,
      timestamp: "Just now",
      isAi: false
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
      ? { ...post, comments: [...post.comments, newComment] } // Add to end
      : post
    ));

    // Clear input
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Community Hub</h2>
          <p className="text-gray-400">Share experiences, ask questions, and warn others about recent scams.</p>
        </div>
        {!user && (
           <div className="text-yellow-500 flex items-center text-sm font-mono bg-yellow-500/10 px-3 py-1 rounded border border-yellow-500/20">
              <AlertCircle size={14} className="mr-2" />
              READ_ONLY_MODE :: LOGIN_REQUIRED
           </div>
        )}
      </div>

      {/* Post Input (Restricted) */}
      <div className={`bg-cyber-dark border border-gray-800 rounded-xl p-6 shadow-xl ${!user ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
        <label className="block text-sm font-mono text-gray-400 mb-2">START_DISCUSSION</label>
        <div className="relative">
            <textarea
                className="w-full h-32 bg-black border border-gray-700 rounded-lg p-4 text-gray-300 focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none transition-all resize-none font-sans"
                placeholder={user ? "Share a suspicious incident or ask for advice..." : "Please login to post content..."}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                disabled={!user}
            />
            <div className="absolute bottom-4 right-4">
                <button 
                    onClick={handlePost}
                    disabled={isPosting || !newPostContent || !user}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                        isPosting || !newPostContent || !user
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-cyber-neon text-black hover:bg-opacity-90'
                    }`}
                >
                    <Send size={16} />
                    <span>{isPosting ? 'POSTING...' : 'PUBLISH'}</span>
                </button>
            </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map((post) => {
            const isLiked = user ? post.likedBy.includes(user.username) : false;

            return (
              <div key={post.id} className="bg-cyber-dark border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-cyber-neon font-bold font-mono">
                              {post.avatar}
                          </div>
                          <div>
                              <div className="font-bold text-white text-sm">{post.author}</div>
                              <div className="flex items-center text-xs text-gray-500">
                                  <Clock size={12} className="mr-1" /> {post.timestamp}
                              </div>
                          </div>
                      </div>
                      <div className="flex items-center space-x-2">
                          {post.tags.map(tag => (
                              <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-gray-900 text-gray-400 border border-gray-800">#{tag}</span>
                          ))}
                      </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                      {post.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center space-x-6 border-t border-gray-800 pt-4 mb-4">
                      <button 
                          onClick={() => handleLike(post.id)}
                          disabled={!user}
                          className={`flex items-center space-x-2 transition-colors group ${
                              isLiked ? 'text-cyber-neon' : 'text-gray-500 hover:text-white'
                          } ${!user ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                          <ThumbsUp size={18} className={`transition-transform ${isLiked ? 'scale-110 fill-cyber-neon/20' : 'group-hover:scale-110'}`}/>
                          <span className="text-sm font-mono">{post.likedBy.length}</span>
                      </button>
                      <div className="flex items-center space-x-2 text-gray-500">
                          <MessageSquare size={18} />
                          <span className="text-sm font-mono">{post.comments.length}</span>
                      </div>
                  </div>

                  {/* Comments Section */}
                  <div className="space-y-4">
                      {/* Comments List */}
                      {post.comments.length > 0 && (
                          <div className="bg-black/30 rounded-lg p-4 space-y-4">
                              {post.comments.map(comment => (
                                  <div key={comment.id} className="flex items-start space-x-3 text-sm">
                                      <div className={`mt-1 ${comment.isAi ? 'text-cyber-blue' : 'text-gray-400'}`}>
                                          {comment.isAi ? <Bot size={16} /> : <UserIcon size={16} />}
                                      </div>
                                      <div className="flex-1">
                                          <div className="flex items-center space-x-2 mb-1">
                                              <span className={`font-bold ${comment.isAi ? 'text-cyber-blue' : 'text-gray-400'}`}>
                                                  {comment.author}
                                              </span>
                                              {comment.isAi && <span className="text-[10px] bg-cyber-blue/20 text-cyber-blue px-1 rounded">BOT</span>}
                                              <span className="text-gray-600 text-xs">• {comment.timestamp}</span>
                                          </div>
                                          <p className="text-gray-400">{comment.content}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}

                      {/* Add Comment Input */}
                      {user && (
                        <div className="flex gap-2">
                           <input 
                              type="text" 
                              placeholder="Write a comment..." 
                              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none"
                              value={commentInputs[post.id] || ''}
                              onChange={(e) => handleCommentChange(post.id, e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment(post.id)}
                           />
                           <button 
                             onClick={() => handleSubmitComment(post.id)}
                             disabled={!commentInputs[post.id]}
                             className="text-gray-400 hover:text-cyber-neon p-2 disabled:opacity-50"
                           >
                             <Send size={18} />
                           </button>
                        </div>
                      )}
                  </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};
