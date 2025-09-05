'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send } from 'lucide-react';
import { TypingIndicator } from '@/components/ui/typing-indicator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

export default function Chat() {
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage } = useChat({
    onFinish: () => setIsStreaming(false),
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Track streaming state
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      // Check if the message appears to be incomplete (still streaming)
      const hasIncompleteText = lastMessage.parts?.some(part => 
        part.type === 'text' && part.text && !part.text.trim().endsWith('.') && !part.text.trim().endsWith('!') && !part.text.trim().endsWith('?')
      );
      setIsStreaming(hasIncompleteText || false);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">

      {/* Messages Area */}
      <ScrollArea className="flex-1 w-full rounded-md border">
        <div className="p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-8">
              <Image src="/robot.png" height={100} width={100} alt='logo careerAI' className='mb-2'></Image>
              <p className="text-lg font-medium mb-2">Selamat Datang di Chatbot Interviewer PT Maju Sejahtera</p>
              <p className="text-sm">Mulai Interview Anda Dengan Kirim Pesan Di sini</p>
            </div>
          )}

          {messages.map((message, index) => (
            <Card key={message.id} className={`${
              message.role === 'user' 
                ? 'ml-auto max-w-[80%] bg-primary text-primary-foreground' 
                : 'mr-auto max-w-[80%]'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="size-8">
                    <AvatarFallback className={message.role === 'user' ? 'bg-primary-foreground/10' : ''}>
                      {message.role === 'user' ? (
                        <User className="size-4" />
                      ) : (
                        <Bot className="size-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={message.role === 'user' ? 'secondary' : 'outline'}
                        className={message.role === 'user' ? 'bg-primary-foreground/20 text-primary-foreground' : ''}
                      >
                        {message.role === 'user' ? 'You' : 'Assistant'}
                      </Badge>
                    </div>
                    <div className="text-sm leading-relaxed relative">
                      {message.parts?.map((part, i) => (
                        <div key={i}>
                          {part.type === 'text' ? (
                            message.role === 'assistant' ? (
                              <div className="markdown-content">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {part.text}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              part.text
                            )
                          ) : ''}
                        </div>
                      )) || ''}
                      {/* Show blinking cursor for the last AI message if streaming */}
                      {message.role === 'assistant' && 
                       index === messages.length - 1 && 
                       isStreaming && (
                        <span className="inline-block w-0.5 h-4 bg-primary ml-1 animate-pulse"></span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Show typing indicator when waiting for first response */}
          {messages.length > 0 && 
           messages[messages.length - 1]?.role === 'user' && 
           !messages.some(m => m.role === 'assistant' && m.id === messages[messages.length - 1]?.id) && (
            <TypingIndicator />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              setIsStreaming(true);
              sendMessage({ text: input });
              setInput('');
            }
          }}
          className="flex space-x-2"
        >
          <Input
            value={input}
            placeholder="Type your message here..."
            onChange={(e) => setInput(e.target.value)}
            disabled={isStreaming}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isStreaming || !input.trim()}
            size="icon"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
