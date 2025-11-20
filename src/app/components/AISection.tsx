"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Folder, HeartHandshakeIcon, SparklesIcon, Database } from "lucide-react";

// Simple utility function to combine class names
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full p-20 pt-10">    
    <motion.div
      className={cn(
        "relative flex h-[400px] w-full max-w-[600px] flex-col items-center mx-auto my-8",
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* SVG Paths  */}
      <motion.svg
        className="h-full w-full text-muted transition-all duration-300"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.6"
          strokeDasharray="100 100"
          pathLength="100"
        >
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          {/* Animation For Path Starting */}
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="2s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
            repeatCount="indefinite"
          />
        </g>
        {/* Animated Blue Lights */}
        <g mask="url(#db-mask-1)">
          <circle
            className="database db-light-1"
            cx="0"
            cy="0"
            r="15"
            fill="url(#db-blue-grad)"
          >
            <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
        <g mask="url(#db-mask-2)">
          <circle
            className="database db-light-2"
            cx="0"
            cy="0"
            r="15"
            fill="url(#db-blue-grad)"
          >
            <animate attributeName="r" values="12;18;12" dur="3s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </circle>
        </g>
        <g mask="url(#db-mask-3)">
          <circle
            className="database db-light-3"
            cx="0"
            cy="0"
            r="15"
            fill="url(#db-blue-grad)"
          >
            <animate attributeName="r" values="12;18;12" dur="3s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="1s" repeatCount="indefinite" />
          </circle>
        </g>
        <g mask="url(#db-mask-4)">
          <circle
            className="database db-light-4"
            cx="0"
            cy="0"
            r="15"
            fill="url(#db-blue-grad)"
          >
            <animate attributeName="r" values="12;18;12" dur="3s" begin="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="1.5s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* Interactive Buttons */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          {/* First Button */}
          <g onMouseEnter={() => setHoveredButton(0)} onMouseLeave={() => setHoveredButton(null)}>
            <rect
              fill={hoveredButton === 0 ? "#22c55e" : "#18181B"}
              x="14"
              y="5"
              width="34"
              height="10"
              rx="5"
            >
              <animate attributeName="fill" values="#18181B;#22c55e;#18181B" dur="4s" repeatCount="indefinite" />
            </rect>
            <Database x="18" y="7.5" width="4" height="4" fill="white" />
            <text
              x="28"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.first || "GET"}
            </text>
          </g>
          {/* Second Button */}
          <g onMouseEnter={() => setHoveredButton(1)} onMouseLeave={() => setHoveredButton(null)}>
            <rect
              fill={hoveredButton === 1 ? "#3b82f6" : "#18181B"}
              x="60"
              y="5"
              width="34"
              height="10"
              rx="5"
            >
              <animate attributeName="fill" values="#18181B;#3b82f6;#18181B" dur="4s" begin="1s" repeatCount="indefinite" />
            </rect>
            <Database x="64" y="7.5" width="4" height="4" fill="white" />
            <text
              x="74"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.second || "POST"}
            </text>
          </g>
          {/* Third Button */}
          <g onMouseEnter={() => setHoveredButton(2)} onMouseLeave={() => setHoveredButton(null)}>
            <rect
              fill={hoveredButton === 2 ? "#f59e0b" : "#18181B"}
              x="108"
              y="5"
              width="34"
              height="10"
              rx="5"
            >
              <animate attributeName="fill" values="#18181B;#f59e0b;#18181B" dur="4s" begin="2s" repeatCount="indefinite" />
            </rect>
            <Database x="112" y="7.5" width="4" height="4" fill="white" />
            <text
              x="122"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.third || "PUT"}
            </text>
          </g>
          {/* Fourth Button */}
          <g onMouseEnter={() => setHoveredButton(3)} onMouseLeave={() => setHoveredButton(null)}>
            <rect
              fill={hoveredButton === 3 ? "#ef4444" : "#18181B"}
              x="150"
              y="5"
              width="40"
              height="10"
              rx="5"
            >
              <animate attributeName="fill" values="#18181B;#ef4444;#18181B" dur="4s" begin="3s" repeatCount="indefinite" />
            </rect>
            <Database x="154" y="7.5" width="4" height="4" fill="white" />
            <text
              x="165"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.fourth || "DELETE"}
            </text>
          </g>
        </g>
        <defs>
          {/* 1 -  user list */}
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 2 - task list */}
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 3 - backlogs */}
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 4 - misc */}
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* Enhanced Gradient */}
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#00A6F5"} />
            <stop offset="50%" stopColor={lightColor || "#0ea5e9"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </motion.svg>
      {/* Main Box */}
      <motion.div 
        className="absolute bottom-8 flex w-full flex-col items-center px-4"
        animate={{
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Enhanced bottom shadow */}
        <motion.div 
          className="absolute -bottom-6 h-[120px] w-[70%] rounded-lg bg-gradient-to-t from-blue-500/20 to-transparent blur-xl" 
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        />
        {/* Enhanced box title */}
        <motion.div 
          className="absolute -top-4 z-20 flex items-center justify-center rounded-lg border border-blue-500/30 bg-gradient-to-r from-[#101112] to-[#1a1a1a] px-3 py-2 shadow-lg backdrop-blur-sm"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <SparklesIcon className="size-3 text-blue-400" />
          </motion.div>
          <span className="ml-2 text-xs font-medium text-gray-200">
            {title ? title : "Data exchange using a customized REST API"}
          </span>
        </motion.div>
        {/* Enhanced outer circle */}
        <motion.div 
          className="absolute -bottom-10 z-30 grid h-[70px] w-[70px] place-items-center rounded-full border-2 border-blue-500/50 bg-gradient-to-b from-[#141516] to-[#0a0a0a] font-semibold text-sm shadow-2xl"
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.span
            className="text-blue-300"
            animate={{ rotate: isHovered ? -360 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {circleText ? circleText : "API"}
          </motion.span>
        </motion.div>
        {/* Enhanced box content */}
        <motion.div 
          className="relative z-10 flex h-[180px] w-full items-center justify-center overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-2xl backdrop-blur-sm"
          animate={{
            boxShadow: isHovered 
              ? "0 25px 50px -12px rgba(59, 130, 246, 0.25)" 
              : "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Enhanced Badges */}
          <motion.div 
            className="absolute bottom-10 left-8 z-10 h-8 rounded-full bg-gradient-to-r from-[#101112] to-[#1a1a1a] px-4 text-xs border border-blue-500/30 flex items-center gap-2 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05, x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <HeartHandshakeIcon className="size-4 text-green-400" />
            <span className="text-gray-200">{buttonTexts?.first || "LegionDev"}</span>
          </motion.div>
          <motion.div 
            className="absolute bottom-10 right-8 z-10 h-8 rounded-full bg-gradient-to-r from-[#101112] to-[#1a1a1a] px-4 text-xs border border-purple-500/30 flex items-center gap-2 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05, x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Folder className="size-4 text-purple-400" />
            <span className="text-gray-200">{buttonTexts?.second || "v2_updates"}</span>
          </motion.div>
          {/* Enhanced Animated Circles */}
          <motion.div
            className="absolute -bottom-16 h-[120px] w-[120px] rounded-full border border-blue-500/20 bg-gradient-to-t from-blue-500/10 to-transparent"
            animate={{
              scale: [0.95, 1.05, 0.95],
              rotate: [0, 360],
            }}
            transition={{ 
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
          />
          <motion.div
            className="absolute -bottom-24 h-[160px] w-[160px] rounded-full border border-purple-500/15 bg-gradient-to-t from-purple-500/8 to-transparent"
            animate={{
              scale: [1, 0.95, 1.05, 1],
              rotate: [0, -360],
            }}
            transition={{ 
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              rotate: { duration: 12, repeat: Infinity, ease: "linear" }
            }}
          />
          <motion.div
            className="absolute -bottom-32 h-[200px] w-[200px] rounded-full border border-green-500/10 bg-gradient-to-t from-green-500/6 to-transparent"
            animate={{
              scale: [1, 1.05, 0.95, 1],
              rotate: [0, 360],
            }}
            transition={{ 
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              rotate: { duration: 15, repeat: Infinity, ease: "linear" }
            }}
          />
          <motion.div
            className="absolute -bottom-40 h-[240px] w-[240px] rounded-full border border-orange-500/8 bg-gradient-to-t from-orange-500/4 to-transparent"
            animate={{
              scale: [0.98, 1, 1.02, 0.98],
              rotate: [0, -360],
            }}
            transition={{ 
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
    </div>
  );
};

export default DatabaseWithRestApi;
