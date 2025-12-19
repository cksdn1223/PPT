import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  BookOpen,
  Check,
  ChevronDown,
  Code,
  Database,
  Github,
  Keyboard,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [presentationMode, setPresentationMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = [
    { id: "intro", label: "Intro", icon: Zap },
    { id: "strategy", label: "Strategy", icon: BookOpen },
    { id: "code", label: "Code", icon: Code },
    { id: "data", label: "AI", icon: Database },
    { id: "team", label: "Team", icon: Users },
    { id: "records", label: "Records", icon: Database },
    { id: "certs", label: "Certs", icon: Check },
    { id: "qna", label: "Q&A", icon: Keyboard },
    { id: "closing", label: "Thanks", icon: Check },
  ];

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!presentationMode) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentSection(prev => Math.max(prev - 1, 0));
      } else if (e.key === "Escape") {
        setPresentationMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [presentationMode, sections.length]);

  // Scroll to current section in normal mode
  useEffect(() => {
    if (presentationMode) return;
    const element = document.getElementById(sections[currentSection].id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSection, presentationMode, sections]);

  // Scroll spy - update active section based on scroll position
  useEffect(() => {
    if (presentationMode) return;

    const handleScroll = () => {
      const sectionElements = sections
        .map(s => document.getElementById(s.id))
        .filter(Boolean);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.getBoundingClientRect().top <= 100) {
          const sectionIndex = sections.findIndex(s => s.id === element.id);
          setCurrentSection(sectionIndex);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Presentation Mode View
  if (presentationMode) {
    return (
      <div className="fixed inset-0 bg-background text-foreground overflow-hidden z-1000">
        {/* Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 h-1 bg-accent z-50"
          animate={{
            width: `${((currentSection + 1) / sections.length) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        />
        {/* Section Counter */}
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 font-mono font-bold text-sm border-2 border-border z-50">
          {currentSection + 1} / {sections.length}
        </div>

        {/* Navigation Hints */}
        <div className="fixed bottom-4 left-4 text-muted-foreground font-mono text-xs z-50">
          ↑↓ Navigate • ESC Exit
        </div>

        {/* Close Button */}
        <button
          onClick={() => setPresentationMode(false)}
          className="fixed top-4 left-4 bg-accent text-accent-foreground px-4 py-2 font-bold text-sm border-2 border-border hover:translate-y-1 transition-transform z-50"
        >
          Exit Presentation
        </button>

        {/* Sections */}
        <div className="relative w-full h-full">
          {/* Intro */}
          {currentSection === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full bg-background flex flex-col justify-center items-center p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 grid-bg pointer-events-none" />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center max-w-4xl"
              >
                <div className="inline-block bg-accent text-accent-foreground px-6 py-2 font-mono text-lg font-bold mb-8 border-2 border-border">
                  SYSTEM_READY // 2025
                </div>
                <h1
                  className="text-9xl font-bold leading-[0.9] tracking-tighter mb-8"
                  style={{
                    fontWeight: 900,
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  DEVELOPER
                  <br />
                  <span className="text-primary">SUCCESS</span>
                  <br />
                  PROTOCOL
                </h1>
                <p className="text-3xl text-muted-foreground max-w-3xl mx-auto mb-12 font-medium">
                  선배 개발자가 전하는 실전 학습 노하우.
                  <br />
                  <span className="text-foreground decoration-accent underline decoration-4 underline-offset-4">
                    영타보다 이해가 우선입니다.
                  </span>
                </p>

                {/* Dual Presenters */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4 bg-primary text-primary-foreground p-6 border-2 border-border"
                  >
                    <div className="w-16 h-16 bg-primary-foreground text-primary flex items-center justify-center font-bold text-2xl border-2 border-primary-foreground">
                      KCW
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xl">김찬우</div>
                      <div className="text-sm flex items-center gap-2">
                        <Github className="w-4 h-4" /> github.com/cksdn1223
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4 bg-accent text-accent-foreground p-6 border-2 border-border"
                  >
                    <div className="w-16 h-16 bg-accent-foreground text-accent flex items-center justify-center font-bold text-2xl border-2 border-accent-foreground">
                      OSH
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xl">오상현</div>
                      <div className="text-sm flex items-center gap-2">
                        <Github className="w-4 h-4" /> github.com/OhSangH
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-muted-foreground"
                >
                  <ChevronDown className="w-8 h-8 mx-auto" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Strategy */}
          {currentSection === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full bg-secondary/30 flex flex-col justify-center p-12 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto w-full">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-7xl font-bold mb-8 text-primary"
                >
                  LEARNING PROTOCOL
                </motion.h2>
                <p className="text-2xl text-muted-foreground mb-12">
                  수업을 따라가기 힘들 때, 이렇게 대처하세요.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="border-4 border-destructive p-8 bg-destructive/5"
                  >
                    <h3 className="font-heading text-3xl font-bold mb-6 text-destructive">
                      The Typing Trap
                    </h3>
                    <p className="text-lg leading-relaxed">
                      "영타가 느려서 코드를 치다가 수업 내용을 놓치고, 이해를 못
                      해서 다음 날 수업도 이해 못 하는 악순환이 반복됩니다."
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="border-4 border-primary p-8 bg-primary/5"
                  >
                    <h3 className="font-heading text-3xl font-bold mb-6 text-primary">
                      Listen & Summarize
                    </h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary" /> 타이핑을 하되
                        이해가 중요
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary" /> 핵심 키워드만
                        적기
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary" /> 쉬는 시간에
                        AI 활용
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Code Growth */}
          {currentSection === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full bg-background flex flex-col justify-center p-12 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto w-full">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-7xl font-bold mb-8 text-primary"
                  style={{
                    fontWeight: 800,
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  THE GROWTH CURVE
                </motion.h2>
                <p className="text-2xl text-muted-foreground mb-12">
                  Java를 제대로 해두면 뒤가 편해집니다.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      num: 1,
                      title: "Java Core",
                      desc: "변수명, 메모리 구조(Stack/Heap), OOP 4대 원칙을 확실히 이해하세요.",
                    },
                    {
                      num: 2,
                      title: "HTML / CSS",
                      desc: "Java를 잊지 않도록 주 1회 코딩테스트를 병행하세요.",
                    },
                    {
                      num: 3,
                      title: "Spring Framework",
                      desc: "기본 메커니즘은 같습니다. Java 기초가 탄탄하면 금방 익힙니다.",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="flex items-start gap-6 bg-secondary border-2 border-border p-8"
                    >
                      <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shrink-0 border-2 border-border">
                        {item.num}
                      </div>
                      <div>
                        <h3
                          className="text-3xl font-bold mb-2"
                          style={{
                            fontWeight: 700,
                            fontFamily: "'Noto Sans KR', sans-serif",
                          }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-lg text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 p-8 bg-accent/10 border-2 border-accent"
                >
                  <h4 className="font-bold text-accent mb-2 flex items-center gap-2 text-xl">
                    <Zap className="w-6 h-6" /> WARNING
                  </h4>
                  <p className="text-lg font-medium">
                    "한 번이라도 안 하면 금방 까먹습니다. 꾸준함이 생명입니다."
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* AI Usage */}
          {currentSection === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full bg-background flex flex-col justify-center p-12 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto w-full">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-7xl font-bold mb-12 text-center"
                >
                  AI USAGE PROTOCOL
                </motion.h2>

                <div className="grid grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-primary/5 border-2 border-primary p-8"
                  >
                    <Check className="w-16 h-16 text-primary mb-4" />
                    <h3
                      className="text-3xl font-bold mb-6 text-primary"
                      style={{
                        fontWeight: 700,
                        fontFamily: "'Noto Sans KR', sans-serif",
                      }}
                    >
                      DO THIS
                    </h3>
                    <ul className="space-y-4 text-lg">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary"></div>
                        에러 메시지 해석
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary"></div>
                        개념 이해 예제
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary"></div>
                        코드 리팩토링
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-accent/10 border-2 border-accent p-8"
                  >
                    <Zap className="w-16 h-16 text-accent mb-4" />
                    <h3 className="font-heading text-3xl font-bold mb-6 text-accent">
                      AVOID THIS
                    </h3>
                    <ul className="space-y-4 text-lg">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent"></div>
                        과제 전체 맡기기
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent"></div>
                        이해 없이 복사
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent"></div>
                        생각 과정 생략
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Team */}
          {currentSection === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full grid grid-cols-2"
            >
              <div className="bg-primary text-primary-foreground p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="font-mono text-accent mb-4 text-2xl">
                    COLLABORATION
                  </div>
                  <h2
                    className="text-7xl font-bold mb-8 leading-tight"
                    style={{
                      fontWeight: 800,
                      fontFamily: "'Noto Sans KR', sans-serif",
                    }}
                  >
                    TOGETHER
                    <br />
                    MAKE
                    <br />
                    BATTER
                  </h2>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.9 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="text-9xl font-bold text-accent opacity-90 mb-4"
                  >
                    90%
                  </motion.div>
                  <p className="text-3xl font-medium">
                    혼자 공부할 때보다 동료와 함께할 때 학습 성공률이 90% 이상
                    증가합니다.
                  </p>
                </motion.div>
              </div>

              <div className="bg-background p-12 flex flex-col justify-center overflow-y-auto">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: "Git Strategy", desc: "브랜치 전략 수립" },
                    { title: "Code Review", desc: "서로의 코드 피드백" },
                    { title: "Documentation", desc: "명확한 문서화" },
                    { title: "Role Division", desc: "역할 분담 관리" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-secondary border-2 border-border p-6"
                    >
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{
                          fontWeight: 700,
                          fontFamily: "'Noto Sans KR', sans-serif",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Records */}
          {currentSection === 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full bg-background flex flex-col justify-center p-12 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto w-full">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-7xl font-bold mb-8 text-primary"
                >
                  GITHUB &<br />
                  NOTION
                </motion.h2>
                <p className="text-2xl text-muted-foreground mb-12">
                  학습 기록을 효과적으로 관리하세요.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-foreground text-background p-8 border-2 border-border"
                  >
                    <Github className="w-12 h-12 mb-4" />
                    <h3 className="font-heading text-3xl font-bold mb-4">
                      GitHub
                    </h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5" /> 매일 커밋하기
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5" /> 의미있는 메시지
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5" /> 코드 리뷰
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-primary text-primary-foreground p-8 border-2 border-border"
                  >
                    <BookOpen className="w-12 h-12 mb-4" />
                    <h3 className="font-heading text-3xl font-bold mb-4">
                      Notion
                    </h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5" /> 학습 일지 작성
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5" /> 개념 정리
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5" /> 팀 문서화
                      </li>
                    </ul>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 p-8 bg-secondary/30 border-2 border-border"
                >
                  <p className="text-2xl font-medium">
                    "기록이 없으면 성장이 없습니다.
                    <br />
                    매일의 작은 커밋이 모여 큰 포트폴리오가 됩니다."
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Certs */}
          {currentSection === 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full bg-secondary/30 flex flex-col justify-center p-12 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto w-full">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-7xl font-bold mb-8 text-primary"
                >
                  CERTIFICATION
                  <br />
                  STRATEGY
                </motion.h2>
                <p className="text-2xl text-muted-foreground mb-12">
                  욕심보다는 현실적인 목표 설정이 중요합니다.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "기사 자격증",
                      type: "ESSENTIAL",
                      desc: "개발자의 기본 소양. 필기와 실기 모두 수업 내용과 연계됩니다.",
                      active: true,
                    },
                    {
                      title: "SQLD",
                      type: "DATABASE",
                      desc: "데이터베이스 이해도 증명. 백엔드 개발자에게 필수적인 역량입니다.",
                      active: true,
                    },
                    {
                      title: "전공 자격증",
                      type: "OPTIONAL",
                      desc: "자신의 특성을 살린 특화 자격증 하나를 추가하세요.",
                      active: false,
                    },
                  ].map((cert, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="bg-background border-2 border-border p-8 flex items-center gap-6 hover:translate-x-2 transition-transform"
                    >
                      <div
                        className={`w-16 h-16 flex items-center justify-center border-2 border-border font-bold text-2xl ${cert.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-3xl font-bold mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-lg text-muted-foreground">
                          {cert.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 p-8 bg-accent text-accent-foreground border-2 border-border"
                >
                  <div className="font-mono text-lg mb-2 opacity-90">
                    REALITY CHECK
                  </div>
                  <div className="text-5xl font-bold mb-4">3 MAX</div>
                  <div className="text-xl">
                    4개는 무리입니다. 핵심 3개에 집중하세요.
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Q&A */}
          {currentSection === 7 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full bg-primary text-primary-foreground flex flex-col justify-center items-center p-12"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="font-mono text-2xl mb-4 opacity-80">
                  INTERACTIVE SESSION
                </div>
                <h2 className="font-heading text-9xl font-bold mb-8">Q&A</h2>
                <p className="text-3xl font-medium max-w-2xl mx-auto mb-12">
                  궁금한 점을 자유롭게 물어보세요.
                  <br />
                  함께 성장하는 시간입니다.
                </p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-2xl"
                >
                  💬 Ask Anything
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Closing */}
          {currentSection === 8 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full bg-foreground text-background flex flex-col justify-center items-center p-12"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="font-heading text-9xl font-bold mb-8 leading-tight">
                  여러분의
                  <br />
                  성공을
                  <br />
                  응원합니다
                </h2>
                <p className="text-4xl font-bold text-accent mb-12">
                  함께하면 할 수 있습니다!
                </p>
                <div className="flex gap-8 justify-center">
                  <a
                    href="https://github.com/cksdn1223"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors"
                  >
                    <Github className="w-8 h-8" /> 김찬우
                  </a>
                  <a
                    href="https://github.com/OhSangH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors"
                  >
                    <Github className="w-8 h-8" /> 오상현
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Normal Mode View
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-100"
        style={{ scaleX }}
      />

      {/* Presentation Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setPresentationMode(true)}
          className="bg-primary text-primary-foreground border-2 border-border px-6 py-3 font-bold flex items-center gap-2 hover:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_var(--color-border)]"
        >
          <Keyboard className="w-5 h-5" /> START PRESENTATION
        </Button>
      </div>

      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 h-full w-16 md:w-20 border-r-4 border-border bg-background z-50 hidden md:flex flex-col items-center py-8 gap-4">
        <div
          className="font-bold text-2xl tracking-tighter rotate-90 origin-center w-full text-center mt-4 text-primary cursor-pointer"
          style={{
            fontWeight: 900,
            fontFamily: "'Space Grotesk', 'Noto Sans KR', sans-serif",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          DEV.GUIDE
        </div>
        <div className="flex-1 flex flex-col gap-4 justify-center w-full items-center">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(idx)}
              className={`p-3 transition-all duration-300 border-2 relative group ${
                currentSection === idx
                  ? "bg-primary text-primary-foreground border-primary translate-x-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-background text-muted-foreground border-transparent hover:border-border hover:text-foreground"
              }`}
              title={section.label}
            >
              <section.icon className="w-6 h-6" />
              <span className="absolute left-14 bg-foreground text-background text-xs font-bold px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {section.label}
              </span>
            </button>
          ))}
        </div>
        <div className="font-mono text-xs rotate-90 mb-8 text-muted-foreground">
          v2025.4
        </div>
      </nav>

      <main className="md:pl-20">
        {/* Intro */}
        <section
          id="intro"
          className="min-h-screen flex flex-col border-b-4 border-border relative overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg pointer-events-none" />

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-border bg-background relative z-10"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-block bg-accent text-accent-foreground px-4 py-1 font-mono text-sm font-bold mb-6 w-max border-2 border-border"
              >
                SYSTEM_READY // 2025
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-heading text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8"
              >
                DEVELOPER
                <br />
                <span className="text-primary">SUCCESS</span>
                <br />
                PROTOCOL
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-medium leading-relaxed"
              >
                선배 개발자가 전하는 실전 학습 노하우.
                <br />
                <span className="text-foreground decoration-accent underline decoration-4 underline-offset-4">
                  여러분들도 하실 수 있습니다
                </span>
              </motion.p>

              {/* Dual Profile */}
              <motion.div
                variants={fadeInUp}
                className="mb-10 p-6 border-2 border-border bg-secondary/30"
              >
                <div className="font-mono text-xs font-bold mb-4 text-muted-foreground uppercase tracking-widest">
                  Presented By
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 h-auto py-4 justify-start gap-4 border-2 border-border hover:bg-white hover:shadow-[4px_4px_0px_0px_var(--color-primary)] transition-all group"
                    onClick={() =>
                      window.open("https://github.com/cksdn1223", "_blank")
                    }
                  >
                    <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg border-2 border-border group-hover:scale-110 transition-transform">
                      KCW
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">김찬우</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Github className="w-3 h-3" /> github.com/cksdn1223
                      </div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-auto py-4 justify-start gap-4 border-2 border-border hover:bg-white hover:shadow-[4px_4px_0px_0px_var(--color-accent)] transition-all group"
                    onClick={() =>
                      window.open("https://github.com/OhSangH", "_blank")
                    }
                  >
                    <div className="w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg border-2 border-border group-hover:scale-110 transition-transform">
                      OSH
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">오상현</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Github className="w-3 h-3" /> github.com/OhSangH
                      </div>
                    </div>
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-border rounded-none px-8 py-6 text-lg font-bold shadow-[6px_6px_0px_0px_var(--color-border)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_var(--color-border)] transition-all"
                  onClick={() => setCurrentSection(1)}
                >
                  START GUIDE <ChevronDown className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-auto bg-muted overflow-hidden group">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 1.5 }}
                src="/images/hero_developer.png"
                alt="Developer Workspace"
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />

              <div className="absolute bottom-0 left-0 bg-background border-t-4 border-r-4 border-border p-6 z-20">
                <div className="font-mono text-xs font-bold mb-1">STATUS</div>
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <span className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
                  ONLINE
                </div>
              </div>
            </div>
          </div>

          {/* Marquee Strip */}
          <div className="bg-foreground text-background py-3 overflow-hidden border-t-4 border-border">
            <motion.div
              animate={{ x: [0, -2400] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex gap-12 whitespace-nowrap text-sm font-bold uppercase tracking-widest"
              style={{
                fontFamily: "'Space Grotesk', 'Noto Sans KR', sans-serif",
              }}
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-8 shrink-0">
                  <span>Java Core</span>
                  <span>•</span>
                  <span>Git Strategy</span>
                  <span>•</span>
                  <span>Code Review</span>
                  <span>•</span>
                  <span>Daily Commit</span>
                  <span>•</span>
                  <span>Peer Learning</span>
                  <span>•</span>
                  <span>Algorithm</span>
                  <span>•</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Strategy */}
        <section
          id="strategy"
          className="min-h-screen py-20 px-6 md:px-12 border-b-4 border-border bg-secondary/30 flex flex-col justify-center"
        >
          <div className="container mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="font-heading text-5xl font-bold mb-8 text-primary"
            >
              LEARNING PROTOCOL
            </motion.h2>
            <p className="text-xl text-muted-foreground mb-12">
              수업을 따라가기 힘들 때, 이렇게 대처하세요.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-4 border-border p-8 bg-destructive/5"
              >
                <h3 className="font-heading text-3xl font-bold mb-6 text-destructive">
                  The Typing Trap
                </h3>
                <p className="text-lg leading-relaxed">
                  "영타가 느려서 코드를 치다가 수업 내용을 놓치고, 이해를 못
                  해서 다음 날 수업도 이해 못 하는 악순환이 반복됩니다."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-4 border-border p-8 bg-primary/5"
              >
                <h3 className="font-heading text-3xl font-bold mb-6 text-primary">
                  Listen & Summarize
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" /> 타이핑을 하되
                    이해가 중요
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" /> 핵심 키워드만
                    적기
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" /> 쉬는 시간에 AI
                    활용
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Code */}
        <section
          id="code"
          className="min-h-screen py-20 px-6 md:px-12 border-b-4 border-border bg-background flex flex-col justify-center"
        >
          <div className="container mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-9xl font-bold mb-8 text-primary"
              style={{
                fontWeight: 900,
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              THE GROWTH CURVE
            </motion.h2>
            <p className="text-xl text-muted-foreground mb-12">
              Java를 제대로 해두면 뒤가 편해집니다.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6 max-w-4xl"
            >
              {[
                {
                  num: 1,
                  title: "Java Core",
                  desc: "변수명, 메모리 구조(Stack/Heap), OOP 4대 원칙을 확실히 이해하세요.",
                },
                {
                  num: 2,
                  title: "HTML / CSS",
                  desc: "Java를 잊지 않도록 주 1회 코딩테스트를 병행하세요.",
                },
                {
                  num: 3,
                  title: "Spring Framework",
                  desc: "기본 메커니즘은 같습니다. Java 기초가 탄탄하면 금방 익힙니다.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-start gap-6 bg-secondary border-2 border-border p-8 hover:translate-x-2 transition-transform"
                >
                  <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shrink-0 border-2 border-border">
                    {item.num}
                  </div>
                  <div>
                    <h3
                      className="text-3xl font-bold mb-2"
                      style={{
                        fontWeight: 700,
                        fontFamily: "'Noto Sans KR', sans-serif",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-lg text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-8 bg-accent/10 border-2 border-accent max-w-4xl"
            >
              <h4 className="font-bold text-accent mb-2 flex items-center gap-2 text-xl">
                <Zap className="w-6 h-6" /> WARNING
              </h4>
              <p className="text-lg font-medium">
                "한 번이라도 안 하면 금방 까먹습니다. 꾸준함이 생명입니다."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Data */}
        <section
          id="data"
          className="min-h-screen py-20 px-6 md:px-12 bg-secondary/30 flex flex-col justify-center border-b-4 border-border"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-12 text-center"
              style={{
                fontWeight: 800,
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              AI USAGE PROTOCOL
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-border">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-12 bg-background border-b-4 md:border-b-0 md:border-r-4 border-border hover:bg-primary/5 transition-colors"
              >
                <Check className="w-16 h-16 text-primary mb-6" />
                <h3
                  className="text-3xl font-bold mb-6 text-primary"
                  style={{
                    fontWeight: 700,
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  DO THIS
                </h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary"></div>
                    에러 메시지 해석 및 디버깅
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary"></div>
                    개념 이해를 위한 예제 요청
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary"></div>
                    코드 리팩토링 아이디어 얻기
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-12 bg-muted/50 hover:bg-muted transition-colors"
              >
                <Zap className="w-16 h-16 text-accent mb-6" />
                <h3
                  className="text-3xl font-bold mb-6 text-accent"
                  style={{
                    fontWeight: 700,
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  AVOID THIS
                </h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent"></div>
                    과제 전체를 AI에게 맡기기
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent"></div>
                    이해 없이 코드 복사-붙여넣기
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent"></div>
                    생각하는 과정 생략하기
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          id="team"
          className="min-h-screen grid grid-cols-1 lg:grid-cols-2 border-b-4 border-border"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-primary text-primary-foreground p-8 md:p-20 flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 bg-[url('/images/collaboration_abstract.png')] bg-cover bg-center mix-blend-overlay" />
            <div className="relative z-10">
              <div className="font-mono text-accent mb-4 text-xl">
                COLLABORATION
              </div>
              <h2 className="font-heading text-6xl md:text-7xl font-bold mb-8 leading-tight">
                TOGETHER
                <br />
                MAKE
                <br />
                BATTER
              </h2>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.9 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-9xl font-bold text-accent opacity-90 mb-4"
              >
                90%
              </motion.div>
              <p className="text-2xl font-medium max-w-md">
                혼자 공부할 때보다 동료와 함께할 때 학습 성공률이 90% 이상
                증가합니다.
              </p>
            </div>
          </motion.div>

          <div className="bg-background p-8 md:p-20 flex flex-col justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                {
                  title: "Git Strategy",
                  desc: "main, develop, feature 브랜치 전략 수립",
                },
                {
                  title: "Code Review",
                  desc: "서로의 코드를 피드백하며 함께 성장",
                },
                {
                  title: "Documentation",
                  desc: "API 명세서, 회의록 등 명확한 문서화",
                },
                {
                  title: "Role Division",
                  desc: "책임감 있는 역할 분담과 일정 관리",
                },
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="border-2 border-border shadow-none rounded-none hover:bg-secondary transition-colors h-full">
                    <CardHeader>
                      <CardTitle className="font-mono text-primary text-lg mb-2">
                        0{idx + 1}
                      </CardTitle>
                      <h3 className="font-heading text-2xl font-bold">
                        {item.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 border-l-4 border-accent bg-secondary/50"
            >
              <p className="text-lg italic font-medium">
                "SQLD 자격증 공부를 혼자 할 때는 포기했지만, 같이 공부하니 90%
                이상 도움이 되었습니다."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Records */}
        <section
          id="records"
          className="min-h-screen py-20 px-6 md:px-12 border-b-4 border-border bg-background flex flex-col justify-center"
        >
          <div className="container mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="font-heading text-5xl font-bold mb-8 text-primary"
            >
              GITHUB &<br />
              NOTION
            </motion.h2>
            <p className="text-xl text-muted-foreground mb-12">
              학습 기록을 효과적으로 관리하세요.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-foreground text-background p-8 border-2 border-border"
              >
                <Github className="w-12 h-12 mb-4" />
                <h3 className="font-heading text-3xl font-bold mb-4">GitHub</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" /> 매일 커밋하기
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" /> 의미있는 메시지
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" /> 코드 리뷰
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-primary text-primary-foreground p-8 border-2 border-border"
              >
                <BookOpen className="w-12 h-12 mb-4" />
                <h3 className="font-heading text-3xl font-bold mb-4">Notion</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" /> 학습 일지 작성
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" /> 개념 정리
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5" /> 팀 문서화
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-8 bg-secondary/30 border-2 border-border max-w-4xl"
            >
              <p className="text-2xl font-medium">
                "기록이 없으면 성장이 없습니다.
                <br />
                매일의 작은 커밋이 모여 큰 포트폴리오가 됩니다."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Certs */}
        <section
          id="certs"
          className="min-h-screen py-20 px-6 md:px-12 border-b-4 border-border bg-secondary/30 flex flex-col justify-center"
        >
          <div className="container mx-auto">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl font-bold mb-6 text-primary"
              style={{
                fontWeight: 700,
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              CERTIFICATION
              <br />
              STRATEGY
            </motion.h2>
            <p className="text-xl text-muted-foreground mb-12">
              욕심보다는 현실적인 목표 설정이 중요합니다.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6 max-w-4xl"
            >
              {[
                {
                  title: "기사 자격증",
                  type: "ESSENTIAL",
                  desc: "개발자의 기본 소양. 필기와 실기 모두 수업 내용과 연계됩니다.",
                  active: true,
                },
                {
                  title: "SQLD",
                  type: "DATABASE",
                  desc: "데이터베이스 이해도 증명. 백엔드 개발자에게 필수적인 역량입니다.",
                  active: true,
                },
                {
                  title: "기타 자격증",
                  type: "OPTIONAL",
                  desc: "자신의 특성을 살린 특화 자격증 하나를 추가하세요.",
                  active: false,
                },
              ].map((cert, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-background border-2 border-border p-8 hover:translate-x-2 transition-transform flex flex-col md:flex-row gap-6 items-start md:items-center"
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center border-2 border-border font-bold text-xl ${cert.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading text-2xl font-bold">
                        {cert.title}
                      </h3>
                      <span className="font-mono text-xs px-2 py-1 border border-border bg-secondary">
                        {cert.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{cert.desc}</p>
                  </div>
                  <Check
                    className={`w-8 h-8 ${cert.active ? "text-primary" : "text-muted-foreground/30"}`}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-8 bg-accent text-accent-foreground border-2 border-border max-w-4xl"
            >
              <div className="font-mono text-lg mb-2 opacity-90">
                REALITY CHECK
              </div>
              <div className="text-5xl font-bold mb-4">3 MAX</div>
              <div className="text-xl">
                4개는 무리입니다. 핵심 3개에 집중하세요.
              </div>
            </motion.div>
          </div>
        </section>

        {/* Q&A */}
        <section
          id="qna"
          className="min-h-screen flex flex-col justify-center items-center p-12 border-b-4 border-border bg-primary text-primary-foreground relative overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="font-mono text-2xl mb-4 opacity-80">
              INTERACTIVE SESSION
            </div>
            <h2 className="font-heading text-8xl font-bold mb-8">Q&A</h2>
            <p className="text-3xl font-medium max-w-2xl mx-auto mb-12">
              궁금한 점을 자유롭게 물어보세요.
              <br />
              함께 성장하는 시간입니다.
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-2xl"
            >
              💬 Ask Anything
            </motion.div>
          </motion.div>
        </section>

        {/* Closing */}
        <section
          id="closing"
          className="min-h-screen flex flex-col justify-center items-center p-12 bg-foreground text-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2
              className="text-8xl font-bold mb-8 leading-tight"
              style={{
                fontWeight: 900,
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              여러분의
              <br />
              성공을
              <br />
              응원합니다
            </h2>
            <p className="text-4xl font-bold text-accent mb-12">
              함께하면 할 수 있습니다!
            </p>
            <div className="flex gap-8 justify-center">
              <a
                href="https://github.com/cksdn1223"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors"
              >
                <Github className="w-8 h-8" /> 김찬우
              </a>
              <a
                href="https://github.com/OhSangH"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors"
              >
                <Github className="w-8 h-8" /> 오상현
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
function useMemo(arg0: () => number, arg1: number[]) {
  throw new Error("Function not implemented.");
}
