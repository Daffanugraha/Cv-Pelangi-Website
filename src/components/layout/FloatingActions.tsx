"use client";

import React, { useState, useRef, useEffect } from "react";
import { getSmartAdvisorReply } from "@/lib/chatbotAdvisor";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text?: string;
  html?: string;
}

const DEFAULT_CHIPS = [
  "Kemasan Skincare Mewah Hemat",
  "Solusi Box Pecah Saat Dilipat",
  "Minta Swatch Sample Kit Gratis",
  "Bagusan Doff atau Glossy?",
  "Syarat Antar-Jemput Gratis Jatim",
  "Cek Pricelist & Biaya Plano",
];

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: "initial-bot-1",
  sender: "bot",
  html: `
    <div class="space-y-1.5 text-left">
      <div class="flex items-center gap-1.5 text-neutral-400 font-medium text-[10px] uppercase tracking-wider">
        <span class="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
        <span>Konsultan Teknis CV Pelangi UV</span>
      </div>
      <p class="font-bold text-neutral-900 text-xs sm:text-[13px] leading-snug">
        Layanan Konsultasi Teknis &amp; Spesifikasi Cetak
      </p>
      <p class="text-neutral-600 text-xs leading-relaxed">
        Silakan ajukan pertanyaan seputar jasa finishing (Hot Stamp Foil, Spot UV, Laminating Thermal, Cast &amp; Cure, Pond Die-Cut) atau ketersediaan bahan baku (Roll Film BOPP, Foil Stamping, Lem Waterbase).
      </p>
      <span class="text-[10px] text-neutral-400 mt-2 block text-right font-medium">
        Online • Respon Cepat &amp; Akurat
      </span>
    </div>
  `,
};

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [chips, setChips] = useState<string[]>(DEFAULT_CHIPS);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleResetChat = () => {
    setMessages([
      {
        id: "msg-reset-" + Date.now(),
        sender: "bot",
        html: `
          <div class="space-y-1.5 text-left">
            <p class="font-bold text-neutral-900 text-xs sm:text-[13px]">
              Percakapan baru telah dimulai ✨
            </p>
            <p class="text-neutral-600 text-xs leading-relaxed">
              Ada kebutuhan finishing cetak (Hot Stamp, Spot UV, Laminasi, Pond) atau masalah kemasan yang ingin didiskusikan?
            </p>
          </div>
        `,
      },
    ]);
    setChips(DEFAULT_CHIPS);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const startTime = Date.now();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.slice(-4),
        }),
      });

      if (!res.ok) {
        throw new Error("API call failed");
      }

      const data = await res.json();
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 600 - elapsed);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: "msg-bot-" + Date.now(),
            sender: "bot",
            html: data.html,
          },
        ]);
        if (data.chips && Array.isArray(data.chips) && data.chips.length > 0) {
          setChips(data.chips);
        }
      }, delay);
    } catch {
      const localResult = getSmartAdvisorReply(text);
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 600 - elapsed);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: "msg-bot-" + Date.now(),
            sender: "bot",
            html: localResult.html,
          },
        ]);
        if (localResult.chips && localResult.chips.length > 0) {
          setChips(localResult.chips);
        }
      }, delay);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">
      {/* Chatbot Window */}
      {isOpen && (
        <div
          id="chatbot-widget"
          className="pointer-events-auto mb-3 w-[350px] sm:w-[380px] h-[510px] max-h-[78vh] rounded-3xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.14)] border border-neutral-200/80 flex flex-col overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-right"
        >
          {/* Header */}
          <div className="p-3.5 bg-[#18181b] text-white flex items-center justify-between relative overflow-hidden shrink-0">
            {/* Signature Pelangi Brand Line */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#b1212b] via-[#e5a00d] to-[#008744]"></div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#25D366]/30"></span>
              </div>
              <div className="min-w-0 text-left">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-headline-sm text-[13.5px] font-bold text-white leading-tight">
                    Pelangi Assistant
                  </h4>
                  <span className="px-1.5 py-0.5 bg-white/10 text-neutral-300 text-[9px] font-medium rounded">
                    Konsultan
                  </span>
                </div>
                <p className="font-body-sm text-[11px] text-neutral-300 leading-tight mt-0.5 truncate flex items-center gap-1">
                  <span>Fast Response • Konsultasi Teknis &amp; Bahan</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 relative z-10">
              {/* Reset Chat Button */}
              <button
                type="button"
                onClick={handleResetChat}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                title="Mulai Percakapan Baru"
                aria-label="Mulai Percakapan Baru"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[15px]">restart_alt</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Tutup Chatbot"
                title="Tutup Chatbot"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[16px]">close</span>
              </button>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#fafafa] text-neutral-800 text-sm">
            {messages.map((msg) =>
              msg.sender === "user" ? (
                <div key={msg.id} className="flex items-start justify-end gap-2">
                  <div className="bg-[#18181b] text-white rounded-2xl rounded-tr-xs p-2.5 sm:p-3 max-w-[85%] text-xs sm:text-[13px] leading-relaxed shadow-2xs">
                    <p>{msg.text}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-[10px] shrink-0 mt-1 font-semibold">
                    Anda
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex items-start gap-2">
                  <div className="bg-white border border-neutral-200/80 rounded-2xl rounded-tl-xs p-3 sm:p-3.5 max-w-[95%] text-xs sm:text-[13px] leading-relaxed shadow-2xs text-neutral-800">
                    <div
                      dangerouslySetInnerHTML={{ __html: msg.html || "" }}
                    />
                  </div>
                </div>
              )
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="bg-white border border-neutral-200/80 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-2xs flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.3s]"></span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-medium">
                    Menyiapkan informasi...
                  </span>
                </div>
              </div>
            )}

            {/* Dynamic Suggestion Chips */}
            <div className="pl-8 pr-1 pt-1">
              <p className="text-[11px] text-neutral-400 mb-1.5 font-medium flex items-center gap-1">
                <span translate="no" className="material-symbols-outlined notranslate text-[13px]">
                  auto_awesome
                </span>{" "}
                Pilihan topik cepat:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {chips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isTyping}
                    onClick={() => handleSend(chip)}
                    className="chat-chip px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200 text-[11px] font-medium transition-all shadow-2xs text-left cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>#</span> {chip}
                  </button>
                ))}
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-2.5 bg-white border-t border-neutral-100 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tulis pertanyaan seputar finishing atau kemasan..."
                autoComplete="off"
                disabled={isTyping}
                className="flex-1 h-9 px-3.5 rounded-full bg-neutral-100/80 border border-neutral-200/80 text-xs sm:text-[13px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-400 focus:bg-white transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 rounded-full bg-[#18181b] hover:bg-black text-white flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Kirim Pesan"
              >
                <span translate="no" className="material-symbols-outlined notranslate text-[16px]">
                  send
                </span>
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-1.5 px-1">
              <span>Konsultasi Teknis <span translate="no" className="notranslate">CV Pelangi UV</span></span>
              <a
                href="https://wa.me/6282231019363"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-700 text-neutral-500 font-medium flex items-center gap-0.5"
              >
                CS WhatsApp{" "}
                <span translate="no" className="material-symbols-outlined notranslate text-[11px]">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Buttons */}
      <div className="flex flex-col items-center gap-2.5 pointer-events-auto">
        {/* WhatsApp Direct Floating Button */}
        <div className="relative group">
          <a
            className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer"
            href={`https://wa.me/6282231019363?text=${encodeURIComponent(
              "Halo Tim Marketing CV Pelangi UV,\n\nSaya [Nama] dari [Perusahaan], mau tanya tentang layanan finishing / bahan baku.\n\nSpesifikasi Kebutuhan:\n- Kebutuhan: \n- Estimasi Kuantitas / Oplah: \n- Spesifikasi Khusus: \n\nMohon informasi penawaran harga & jadwal pengerjaan. Terima kasih!"
            )}`}
            rel="noopener noreferrer"
            target="_blank"
            title="Chat WhatsApp CS Pelangi UV"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[24px]">
              chat
            </span>
          </a>
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1 rounded-lg bg-[#18181b] text-white text-[11px] whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            Chat WhatsApp CS
          </div>
        </div>

        {/* Floating Chatbot Toggle Button */}
        <div className="relative group">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 rounded-full bg-[#18181b] hover:bg-black text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer border border-white/10"
            aria-label="Buka Pelangi Assistant"
            title="Pelangi Assistant - Konsultasi & CS"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[22px]">
              {isOpen ? "close" : "support_agent"}
            </span>
          </button>
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1 rounded-lg bg-[#18181b] text-white text-[11px] whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            Pelangi Assistant (Konsultasi)
          </div>
        </div>
      </div>
    </div>
  );
}
