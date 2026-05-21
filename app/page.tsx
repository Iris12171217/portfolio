"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  User,
  Sparkles,
  Mail,
  ExternalLink,
  Briefcase,
  FolderOpen,
  Download,
  Copy,
  Check,
  Zap,
  Code
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "嗨！我是雅涵的 AI 分身 ✨\n\n你可以问我任何问题，比如：\n• 什么时候能到岗\n• 期望薪资范围\n• 我的核心优势\n• 项目和实习经历\n\n或者直接点击下方的快捷按钮 👇"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const contactInfo = {
    email: "xuyahan1217@163.com",
    xiaohongshu: "https://www.xiaohongshu.com/user/profile/5d39459800000000120239aa",
    bilibili: "https://space.bilibili.com/171835881?spm_id_from=333.1007.0.0",
    wechatArticle: "https://mp.weixin.qq.com/s/UpUw8IAYJyt0LFHtc0vkMQ"
  };

  const quickQuestions = [
    { icon: "🚀", text: "什么时候能到岗？" },
    { icon: "💰", text: "期望薪资是多少？" },
    { icon: "✨", text: "你的核心优势？" },
    { icon: "🎯", text: "介绍你的项目经验" },
    { icon: "💼", text: "实习经历详情" },
    { icon: "📧", text: "如何联系你？" },
    { icon: "🎓", text: "学历和成绩" },
    { icon: "🛠️", text: "会哪些技能？" }
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResume = () => {
    window.location.href = "mailto:" + contactInfo.email;
  };

  const getResponse = (question: string): string => {
    const q = question.toLowerCase();

    if (q.includes("到岗") || q.includes("时间") || q.includes("什么时候")) {
      return "随时可以到岗！🚀\n\n目前大四课程基本结束，全职/实习都可以 ASAP 上岗。我已经准备好投入新工作啦～\n\n有什么想进一步了解的吗？";
    }
    if (q.includes("薪资") || q.includes("待遇") || q.includes("期望")) {
      return "关于薪资 💰\n\n比起数字，我更看重团队氛围和成长机会！根据市场行情和岗位要求可以面议～\n\n我相信优秀的公司会给出合理的 offer，期待和你的 team 进一步交流！✨";
    }
    if (q.includes("优势") || q.includes("特长") || q.includes("亮点")) {
      return "我的核心优势 ✨\n\n🎯 **执行力超强** - 招行实习把流程效率提升了 20%，处理了 800+ 份合同\n\n🤖 **AI 实战经验** - Coze、OpenClaw 都会玩，有项目落地经验\n\n📝 **内容创作老手** - 7 年剪辑经验，写过 50+ 篇公众号文章，单篇阅读 3000+\n\n📚 **学习能力强** - 专业课平均 90+，新技能上手超快！\n\n想了解具体哪个方面的细节吗？";
    }
    if (q.includes("实习") || q.includes("经历")) {
      return "我的实习经历 💼\n\n🏦 **招商银行** 消费信贷岗 | 2025.12-2026.03\n接待 200+ 客户，处理 800+ 合同，效率提升 20%\n\n👕 **优衣库** 销售运营岗 | 2024.02-2025.04\n中英双语接待 3000+ 人，协助财务分析\n\n🎬 **元点创想** 运营实习 | 2022.07-2022.09\n直播观看 30 万+，转化率 70%\n\n还有什么想深入了解的吗？";
    }
    if (q.includes("项目")) {
      return "我的项目经验 🎯\n\n🤖 **EssayMind AI 学术助手**\nhttps://essaymind.com/writer\n用 AI 帮学生提高写作效率，正在持续迭代中～\n\n📱 **自媒体运营**\n小红书 + B 站持续创作，有个 15 万播放的爆款视频！\n\n📢 **新媒体运营**\n当过新媒体部部长，管理公众号，写了 50+ 篇文章\n\n对哪个项目最感兴趣？我可以详细说说～";
    }
    if (q.includes("学历") || q.includes("学校") || q.includes("专业") || q.includes("成绩")) {
      return "学历背景 🎓\n\n📚 上海理工大学\n国际经济与贸易 | 本科 | 2026 届\n\n📊 主课成绩：会计学(90) 经济统计学(95) 国际经济学(95) 国际营销学(90)\n\n🏆 荣誉：校庆历史剧最佳演员奖、上海市汇创青春一等奖\n\n还有什么想了解的吗？";
    }
    if (q.includes("技能") || q.includes("会什么")) {
      return "我的技能树 🛠️\n\n🌐 语言：英语 CET-6 + 普通话二甲\n\n💻 技术：Python + SQL + Excel 高级应用 + AI 工具(Coze/OpenClaw)\n\n🎨 创作：视频剪辑 7 年经验 + PS + PPT\n\n📜 证书：计算机二级 + 驾照\n\n想了解哪个技能的具体应用场景？";
    }
    if (q.includes("联系") || q.includes("邮箱") || q.includes("电话") || q.includes("微信")) {
      return "联系我 📧\n\n📧 邮箱：xuyahan1217@163.com\n💬 微信：xuyahan_wx\n📱 电话：138****8888\n\n📕 小红书：圆布圆布\n📺 B 站：圆布圆布\n\n期待和你交流！✨";
    }
    if (q.includes("兴趣") || q.includes("爱好") || q.includes("平时")) {
      return "我的兴趣 🌟\n\n📝 写作 - 记录生活想法，写过 50+ 篇文章\n\n📷 摄影 - 捕捉美好瞬间，最爱拍城市街景\n\n🎬 剪辑 - 7 年视频剪辑经验，享受创作过程\n\n工作之余我还会刷小红书找灵感、看 B 站学新技能～\n\n你也对这些感兴趣吗？";
    }

    return "好问题！🤔\n\n建议我们面试时深入聊聊～不过如果你有其他想了解的，随时问我！可以点击下方的快捷按钮 👇";
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);
    setShowQuickQuestions(false);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* 头部个人信息区 */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* 头像 */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white">
                <Image
                  src="/avatar.jpg"
                  alt="许雅涵"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>
            </div>

            {/* 名字和介绍 */}
            <div className="flex-1 text-center space-y-3">
              <h1 className="text-5xl font-bold text-slate-900">
                许雅涵
              </h1>
              <p className="text-xl text-slate-600 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                努力创造更大的价值
              </p>

              {/* 状态条 */}
              <div className="flex items-center justify-center gap-4 text-sm pt-2">
                <span className="px-4 py-1.5 rounded-full bg-blue-500 text-white font-medium">
                  求职中 · 可随时到岗
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">AI项目落地 · 数据分析 · 市场营销 · 互联网运营</span>
              </div>

              {/* 主要按钮 */}
              <div className="flex items-center justify-center gap-3 pt-3">
                <Button
                  onClick={downloadResume}
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white h-11 px-6"
                >
                  <Download className="w-4 h-4 mr-2" />
                  获取简历
                </Button>
                <Button
                  onClick={copyEmail}
                  variant="outline"
                  size="lg"
                  className="border-slate-200 text-slate-700 hover:bg-slate-50 h-11 px-6"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                  {copied ? "已复制邮箱" : contactInfo.email}
                </Button>
              </div>
            </div>
          </div>

          {/* 自我介绍 */}
          <p className="text-center text-slate-500 max-w-2xl mx-auto mt-8 leading-relaxed">
            上海理工大学国际经济与贸易专业大四学生，正在推进<span className="text-blue-600 font-medium">AI 学术辅助网站</span>项目，
            同时持续进行<span className="text-blue-600 font-medium">自媒体创作</span>。
            对 AI 应用和视频创作充满热情，渴望发挥创造力为企业创造价值。
          </p>
        </div>

        {/* 聊天入口提示 */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium">
              <Zap className="w-4 h-4" />
              向下滚动或直接与 AI 分身对话
            </div>
            <div className="animate-bounce">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* 主要内容区 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* 左侧：信息卡片 */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-slate-900">关于我</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">身份</span>
                  <span className="font-medium text-slate-900">大四应届生</span>
                </div>
                <Separator className="bg-slate-100" />
                <div className="flex justify-between">
                  <span className="text-slate-500">擅长</span>
                  <span className="font-medium text-slate-900">AI项目落地 · 数据分析 · 市场营销 · 互联网运营</span>
                </div>
                <Separator className="bg-slate-100" />
                <div className="flex justify-between">
                  <span className="text-slate-500">特质</span>
                  <span className="font-medium text-blue-600">创造力驱动</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-slate-900">技能标签</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-700 border-0">AI/Coze</Badge>
                  <Badge className="bg-blue-50 text-blue-600 border-0">视频剪辑</Badge>
                  <Badge className="bg-slate-100 text-slate-600 border-0">内容运营</Badge>
                  <Badge className="bg-blue-50 text-blue-600 border-0">Python</Badge>
                  <Badge className="bg-blue-100 text-blue-700 border-0">SQL</Badge>
                  <Badge className="bg-slate-100 text-slate-600 border-0">英语CET-6</Badge>
                  <Badge className="bg-blue-50 text-blue-600 border-0">PPT</Badge>
                  <Badge className="bg-blue-100 text-blue-700 border-0">PS</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：AI 分身聊天区 */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-blue-500 bg-white shadow-sm h-[600px] flex flex-col">
              <CardHeader className="border-b border-slate-100 bg-blue-500 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-white/30">
                      <Image
                        src="/avatar.jpg"
                        alt="许雅涵"
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2 text-white">
                      与雅涵的 AI 分身对话
                      <Zap className="w-4 h-4 text-yellow-300" />
                    </CardTitle>
                    <CardDescription className="text-xs text-blue-100">
                      随时回答关于雅涵的任何问题
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* 消息区域 */}
                <div
                  ref={messagesContainerRef}
                  className="flex-1 p-6 overflow-y-auto"
                  style={{ maxHeight: "calc(600px - 200px)" }}
                >
                  <div className="space-y-5">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-slate-200 flex-shrink-0">
                            <Image
                              src="/avatar.jpg"
                              alt="许雅涵"
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                            msg.role === "user"
                              ? "bg-blue-500 text-white rounded-br-md"
                              : "bg-slate-100 text-slate-800 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                        </div>
                        {msg.role === "user" && (
                          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-slate-200">
                          <Image
                            src="/avatar.jpg"
                            alt="许雅涵"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="bg-slate-100 rounded-2xl rounded-bl-md px-5 py-4">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Auto-scroll anchor */}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* 快捷问题按钮 */}
                {showQuickQuestions && (
                  <div className="px-6 py-4 border-t border-slate-100 max-h-[200px] overflow-y-auto">
                    <p className="text-xs text-slate-500 mb-3">💡 快速点击提问：</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {quickQuestions.map((q, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSend(q.text)}
                          className="h-auto py-3 px-3 text-xs flex flex-col items-center gap-1 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-500 transition-all"
                        >
                          <span className="text-lg">{q.icon}</span>
                          <span className="text-center leading-tight">{q.text}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 输入区域 */}
                <div className="p-4 border-t border-slate-100 bg-slate-50">
                  <div className="flex gap-3">
                    <Input
                      placeholder="问我任何关于雅涵的问题..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 border-slate-200 bg-white focus:border-blue-500"
                    />
                    <Button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isTyping}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 作品集链接区 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FolderOpen className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-slate-900">我的作品集</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href={contactInfo.xiaohongshu}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border border-slate-200 bg-white shadow-sm hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <span className="text-3xl">📕</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900">小红书</h3>
                  <p className="text-sm text-slate-500 mt-1">圆布圆布</p>
                  <p className="text-xs text-slate-400 mt-2">生活记录 · 创作分享</p>
                </CardContent>
              </Card>
            </a>

            <a
              href={contactInfo.bilibili}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border border-slate-200 bg-white shadow-sm hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <span className="text-3xl">📺</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900">哔哩哔哩</h3>
                  <p className="text-sm text-slate-500 mt-1">圆布圆布</p>
                  <p className="text-xs text-slate-400 mt-2">视频创作 · 记录生活</p>
                </CardContent>
              </Card>
            </a>

            <a
              href="https://essaymind.com/writer"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border border-slate-200 bg-white shadow-sm hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <span className="text-3xl">🤖</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900">EssayMind</h3>
                  <p className="text-sm text-slate-500 mt-1">AI 学术助手</p>
                  <p className="text-xs text-slate-400 mt-2">AI赋能的学术写作平台</p>
                </CardContent>
              </Card>
            </a>

            <a
              href={contactInfo.wechatArticle}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border border-slate-200 bg-white shadow-sm hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <span className="text-3xl">📝</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900">公众号文章</h3>
                  <p className="text-sm text-slate-500 mt-1">原创精选</p>
                  <p className="text-xs text-slate-400 mt-2">50+篇文章 · 阅读3000+</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </section>

        {/* 实习经历展示区 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-slate-900">实习经历</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border border-slate-200 bg-white shadow-sm hover:border-blue-500 transition-all group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <span className="text-2xl">🏦</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 border-0">2025.12-2026.03</Badge>
                </div>
                <CardTitle className="text-lg text-slate-900">招商银行</CardTitle>
                <CardDescription className="text-slate-500">消费信贷岗</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span className="text-slate-700">接待客户 <strong className="text-blue-600">200+</strong> 人次</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span className="text-slate-700">筛选高意向线索 <strong className="text-blue-600">30+</strong> 条</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span className="text-slate-700">处理合同 <strong className="text-blue-600">800+</strong> 份</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span className="text-slate-700">效率提升 <strong className="text-blue-600">20%</strong></span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-sm hover:border-blue-500 transition-all group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <span className="text-2xl">👕</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 border-0">2024.02-2025.04</Badge>
                </div>
                <CardTitle className="text-lg text-slate-900">优衣库</CardTitle>
                <CardDescription className="text-slate-500">销售运营岗 · 迅销商贸</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span className="text-slate-700">中英双语接待 <strong className="text-blue-600">3000+</strong> 人</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span className="text-slate-700">协助财务分析工作</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span className="text-slate-700">运营决策支持</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-sm hover:border-blue-500 transition-all group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <Badge className="bg-slate-100 text-slate-600 border-0">2022.07-2022.09</Badge>
                </div>
                <CardTitle className="text-lg text-slate-900">元点创想</CardTitle>
                <CardDescription className="text-slate-500">运营实习岗</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span className="text-slate-700">直播观看 <strong className="text-blue-600">30万+</strong></span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span className="text-slate-700">转化率 <strong className="text-blue-600">70%</strong></span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span className="text-slate-700">7年视频剪辑经验</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 代表作 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-slate-900">代表作</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.bilibili.com/video/BV1E1pLz7EWa/?share_source=copy_web&vd_source=8d85d61963d0062e90298693b446d863"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border border-slate-200 bg-white shadow-sm hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <span className="text-3xl">🎬</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900">意识流微电影《夏の終わりに》</h3>
                  <p className="text-sm text-slate-500 mt-1">全流程个人项目</p>
                  <p className="text-xs text-slate-400 mt-2">独立编剧 · 拍摄 · 表演 · 剪辑</p>
                </CardContent>
              </Card>
            </a>

            <a
              href="https://www.xiaohongshu.com/discovery/item/69d58e1e0000000023024317?source=webshare&xhsshare=pc_web&xsec_token=ABLvSw8ZDWu3un2JTgJ5xNERW3JUx026XNQlEhaBABOb4=&xsec_source=pc_share"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border border-slate-200 bg-white shadow-sm hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <span className="text-3xl">🔥</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900">爆款视频《巴黎的爱乐之城》</h3>
                  <p className="text-sm text-slate-500 mt-1">小红书爆款</p>
                  <p className="text-xs text-slate-400 mt-2">15万播放 · 2万点赞</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </section>

        {/* 页脚 */}
        <footer className="text-center text-sm text-slate-500 py-8">
          <p>© 2026 许雅涵 · 用 AI 连接每一个机会 ✨</p>
        </footer>
      </div>
    </div>
  );
}
