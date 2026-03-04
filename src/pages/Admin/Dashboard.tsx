import { useEffect, useState, type JSX } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { getCallLogs, getDashboardStats, getTopAgents } from "../../api";
import { X } from "lucide-react";
import toast from "react-hot-toast";

// 🔹 Stat Card Type
interface StatCard {
  label:
    | "Total Calls"
    | "Answered Calls"
    | "Missed Calls"
    | "Avg Call Duration"
    | "Total Talk Time"
    | "Conversions";
  value: string;
  change: string;
  icon: string;
}

interface StatCardIconProps {
  label: StatCard["label"];
}

// CallLog type define karo (component ke bahar)
interface CallLog {
  id: number;
  call_id: string;
  agent_id: string;
  call_status: string;
  call_type: string | null;
  direction: string | null;
  from_number: string | null;
  to_number: string | null;
  duration_ms: number | null;
  start_timestamp: string;
  end_timestamp: string | null;
  transcript: string | null;
  recording_url: string | null;
  disconnection_reason: string | null;
  call_analysis: {
    call_summary: string;
    user_sentiment: string;
    call_successful: boolean;
  } | null;
}

interface DashboardStats {
  kpis: {
    total_calls: { value: number; trend: number };
    answered_calls: { value: number; trend: number };
    missed_calls: { value: number; trend: number };
    avg_call_duration_seconds: { value: number; trend: number };
    total_talk_time_minutes: { value: number; trend: number };
    conversions: { value: number; trend: number };
  };
  chart: {
    trend_percentage: number;
    total_week: number;
    daily_average: number;
    peak_day: string;
    series: { day: string; date: string; total: number; answered: number }[];
  };
}

interface TopAgent {
  agent_id: string;
  name: string;
  total_calls: number;
  success_rate: number;
  trend: "up" | "down";
}

// const callVolumeData = [
//   { day: "Mon", calls: 165, calls2: 155 },
//   { day: "Tue", calls: 178, calls2: 160 },
//   { day: "Wed", calls: 172, calls2: 158 },
//   { day: "Thu", calls: 220, calls2: 195 },
//   { day: "Fri", calls: 210, calls2: 185 },
//   { day: "Sat", calls: 150, calls2: 130 },
//   { day: "Sun", calls: 115, calls2: 100 },
// ];

// const topPerformers = [
//   {
//     name: "Agent Sarah",
//     calls: 342,
//     successRate: 85,
//     trend: "up",
//     color: "#06b6d4",
//   },
//   {
//     name: "Agent Tom",
//     calls: 298,
//     successRate: 90,
//     trend: "up",
//     color: "#06b6d4",
//   },
//   {
//     name: "Agent Uma",
//     calls: 215,
//     successRate: 78,
//     trend: "up",
//     color: "#06b6d4",
//   },
//   {
//     name: "Agent Victor",
//     calls: 180,
//     successRate: 82,
//     trend: "down",
//     color: "#06b6d4",
//   },
// ];

// const statCards: StatCard[] = [
//   { label: "Total Calls", value: "1,248", change: "+12%", icon: "📞" },
//   { label: "Answered Calls", value: "1,020", change: "+12%", icon: "📲" },
//   { label: "Missed Calls", value: "228", change: "+12%", icon: "📵" },
//   { label: "Avg Call Duration", value: "3m 42s", change: "+12%", icon: "⏱️" },
//   { label: "Total Talk Time", value: "65h 14m", change: "+12%", icon: "☎️" },
//   { label: "Conversions", value: "146", change: "+12%", icon: "🔁" },
// ];

const PhoneIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

// const BellIcon = () => (
//   <svg
//     className="w-5 h-5"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={1.8}
//       d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//     />
//   </svg>
// );

// const SearchIcon = () => (
//   <svg
//     className="w-4 h-4 text-gray-400"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//     />
//   </svg>
// );

const TrendUpIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const TrendDownIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
    />
  </svg>
);

const PlayIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const DocIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

// const EyeIcon = () => (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//     />
//   </svg>
// );

// const DownloadIcon = () => (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//     />
//   </svg>
// );

const ChevronDown = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const StatCardIcon = ({ label }: StatCardIconProps): JSX.Element => {
  const iconMap = {
    "Total Calls": (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    "Answered Calls": (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
        />
      </svg>
    ),
    "Missed Calls": (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    "Avg Call Duration": (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    "Total Talk Time": (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    Conversions: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  };
  return iconMap[label] || <PhoneIcon />;
};

// ── Transcript Modal ──
const TranscriptModal = ({
  log,
  onClose,
}: {
  log: CallLog;
  onClose: () => void;
}) => {
  // Parse transcript_object if available, else split plain text
  const messages: { role: string; content: string }[] = [];

  if (log.transcript) {
    const lines = log.transcript.split("\n").filter((l) => l.trim());
    for (const line of lines) {
      if (line.startsWith("Agent:")) {
        messages.push({
          role: "agent",
          content: line.replace("Agent:", "").trim(),
        });
      } else if (line.startsWith("User:")) {
        messages.push({
          role: "user",
          content: line.replace("User:", "").trim(),
        });
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-800">
              Call Transcript
            </h3>
            <p
              className="text-xs text-gray-400 mt-0.5 truncate max-w-xs"
              title={log.call_id}
            >
              {log.call_id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X />
          </button>
        </div>

        {/* Call Meta */}
        <div className="flex gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs text-gray-500 flex-wrap">
          {log.call_analysis?.call_summary && (
            <p className="text-xs text-gray-600 italic">
              📋 {log.call_analysis.call_summary}
            </p>
          )}
          {log.call_analysis?.user_sentiment && (
            <span className="inline-flex items-center gap-1">
              😊 Sentiment:{" "}
              <span className="font-medium text-gray-700 capitalize">
                {log.call_analysis.user_sentiment}
              </span>
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-3">
          {messages.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">
              No structured transcript available.
            </p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold
                    ${msg.role === "agent" ? "bg-cyan-500" : "bg-gray-400"}`}
                >
                  {msg.role === "agent" ? "A" : "U"}
                </div>
                {/* Bubble */}
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                    ${
                      msg.role === "agent"
                        ? "bg-cyan-50 text-gray-800 rounded-tl-none"
                        : "bg-gray-100 text-gray-700 rounded-tr-none"
                    }`}
                >
                  <p
                    className={`text-[10px] font-semibold mb-1 uppercase tracking-wide
                    ${msg.role === "agent" ? "text-cyan-500" : "text-gray-400"}`}
                  >
                    {msg.role === "agent" ? "Agent" : "User"}
                  </p>
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  //   const [activeTab, setActiveTab] = useState("all");
  //   const getInitial = (name: string) => name.split(" ")[1][0];
  const getInitial = (name: string): string => {
    const parts = name.split(" ");
    return parts.length > 1 ? parts[1][0] : parts[0][0];
  };

  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [transcriptLog, setTranscriptLog] = useState<CallLog | null>(null);
  const [topAgents, setTopAgents] = useState<TopAgent[]>([]);
  const [agentsLoading, setAgentsLoading] = useState(true);
  const PAGE_SIZE = 10;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/signin";
  };

  useEffect(() => {
    const fetchLogs = async () => {
      setLogsLoading(true);
      try {
        const data = await getCallLogs(currentPage, PAGE_SIZE);
        setCallLogs(data.data || []);
        setTotalLogs(data.total || 0);
      } catch (err) {
        console.error("Failed to fetch call logs:", err);
      } finally {
        setLogsLoading(false);
      }
    };
    fetchLogs();
  }, [currentPage]);

  useEffect(() => {
    const fetchTopAgents = async () => {
      setAgentsLoading(true);
      try {
        const data = await getTopAgents();
        setTopAgents(data.agents || []);
      } catch (err) {
        console.error("Failed to fetch top agents:", err);
        toast.error("Failed to load top agents.");
      } finally {
        setAgentsLoading(false);
      }
    };
    fetchTopAgents();
  }, []);

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        toast.error("Failed to load dashboard stats.");
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatAvgDuration = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const formatTrend = (trend: number): string =>
    trend >= 0 ? `+${trend}%` : `${trend}%`;

  const getTrendColor = (trend: number): string =>
    trend >= 0 ? "text-emerald-500 bg-emerald-50" : "text-red-500 bg-red-50";

  // Helper functions
  const formatDuration = (ms: number | null): string => {
    if (!ms) return "—";
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDateTime = (ts: string | null): string => {
    if (!ts) return "—";
    return new Date(ts).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "ended":
        return "bg-emerald-50 text-emerald-600";
      case "completed":
        return "bg-emerald-50 text-emerald-600";
      case "missed":
        return "bg-red-50 text-red-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const totalPages = Math.ceil(totalLogs / PAGE_SIZE);

  const handlePlayClick = (log: CallLog) => {
    if (!log.recording_url) {
      toast.error("No recording available for this call.");
      return;
    }
    window.open(log.recording_url, "_blank");
  };

  const handleTranscriptClick = (log: CallLog) => {
    if (!log.transcript) {
      toast.error("No transcript available for this call.");
      return;
    }
    setTranscriptLog(log);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Transcript Modal */}
      {transcriptLog && (
        <TranscriptModal
          log={transcriptLog}
          onClose={() => setTranscriptLog(null)}
        />
      )}
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-5 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Dashboard
        </h1>
        {/* <div className="flex items-center gap-2 sm:gap-4 flex-1 mx-4 sm:mx-8 max-w-md">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-full">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search anything"
              className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
            />
          </div>
        </div> */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                <BellIcon />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
            </button> */}
          <div
            className="flex items-center gap-2 cursor-pointer "
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-xs font-semibold">
              {storedUser.email?.[0].toUpperCase() || "U"}
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-gray-800 leading-tight">
                {storedUser.email || "Unknown User"}
              </p>
              <p className="text-xs text-gray-400">
                {storedUser.role?.charAt(0).toUpperCase() +
                  storedUser.role?.slice(1) || "Role"}
              </p>
            </div>
            <ChevronDown />
            {/* Dropdown */}
            {dropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                  }}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg z-20 overflow-hidden">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-50">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {storedUser.email || "Unknown User"}
                    </p>
                    <p className="text-xs text-gray-400 capitalize mt-0.5">
                      {storedUser.role || "Role"}
                    </p>
                  </div>
                  {/* Logout Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {statsLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm animate-pulse"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 mb-3" />
                  <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-6 bg-gray-100 rounded w-1/2" />
                </div>
              ))
            : stats
              ? [
                  {
                    label: "Total Calls" as const,
                    value: stats.kpis.total_calls.value.toLocaleString(),
                    trend: stats.kpis.total_calls.trend,
                  },
                  {
                    label: "Answered Calls" as const,
                    value: stats.kpis.answered_calls.value.toLocaleString(),
                    trend: stats.kpis.answered_calls.trend,
                  },
                  {
                    label: "Missed Calls" as const,
                    value: stats.kpis.missed_calls.value.toLocaleString(),
                    trend: stats.kpis.missed_calls.trend,
                  },
                  {
                    label: "Avg Call Duration" as const,
                    value: formatAvgDuration(
                      stats.kpis.avg_call_duration_seconds.value,
                    ),
                    trend: stats.kpis.avg_call_duration_seconds.trend,
                  },
                  {
                    label: "Total Talk Time" as const,
                    value: `${stats.kpis.total_talk_time_minutes.value}h`,
                    trend: stats.kpis.total_talk_time_minutes.trend,
                  },
                  {
                    label: "Conversions" as const,
                    value: stats.kpis.conversions.value.toLocaleString(),
                    trend: stats.kpis.conversions.trend,
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-500">
                        <StatCardIcon label={card.label} />
                      </div>
                      <span
                        className={`text-xs font-medium px-1.5 py-0.5 rounded-md ${getTrendColor(card.trend)}`}
                      >
                        {formatTrend(card.trend)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-0.5">{card.label}</p>
                    <p className="text-xl font-bold text-gray-800">
                      {card.value}
                    </p>
                  </div>
                ))
              : null}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Call Volume Trends */}
          <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Call Volume Trends
                </h2>
                <p className="text-sm text-gray-400">
                  7-day performance overview
                </p>
              </div>
              {stats && (
                <span
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${getTrendColor(stats.chart.trend_percentage)}`}
                >
                  <TrendUpIcon /> {formatTrend(stats.chart.trend_percentage)} vs
                  last week
                </span>
              )}
            </div>

            <div className="mt-4 h-56">
              {statsLoading ? (
                <div className="h-full bg-gray-50 rounded-xl animate-pulse" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={stats?.chart.series || []}
                    margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorCalls"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#06b6d4"
                          stopOpacity={0.25}
                        />
                        <stop
                          offset="95%"
                          stopColor="#06b6d4"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorCalls2"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0e7490"
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0e7490"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f0f0f0"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        fontSize: "12px",
                      }}
                      labelStyle={{ fontWeight: 600, color: "#374151" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      name="Total Calls"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      fill="url(#colorCalls)"
                      dot={{ r: 3, fill: "#06b6d4", strokeWidth: 0 }}
                      activeDot={{ r: 5 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="answered"
                      name="Answered"
                      stroke="#0e7490"
                      strokeWidth={2}
                      fill="url(#colorCalls2)"
                      dot={{ r: 3, fill: "#0e7490", strokeWidth: 0 }}
                      activeDot={{ r: 5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Chart Footer */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-50">
              {statsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-2 bg-gray-100 rounded w-2/3 mb-2" />
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                    </div>
                  ))
                : stats
                  ? [
                      { label: "PEAK DAY", value: stats.chart.peak_day },
                      {
                        label: "DAILY AVERAGE",
                        value: `${stats.chart.daily_average} calls`,
                      },
                      {
                        label: "TOTAL WEEK",
                        value: `${stats.chart.total_week} calls`,
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs text-gray-400 mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          {item.value}
                        </p>
                      </div>
                    ))
                  : null}
            </div>
          </div>

          {/* Top Performers */}
          {/* Top Performers */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Top Performers
                </h2>
                <p className="text-sm text-gray-400">This week</p>
              </div>
              <button
                onClick={() => {
                  setAgentsLoading(true);
                  getTopAgents()
                    .then((d) => setTopAgents(d.agents || []))
                    .catch(() => toast.error("Failed to refresh."))
                    .finally(() => setAgentsLoading(false));
                }}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-cyan-500 transition-colors cursor-pointer"
                title="Refresh"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {agentsLoading ? (
                // Skeleton
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2 animate-pulse">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-3 bg-gray-100 rounded w-1/2 mb-1" />
                        <div className="h-2 bg-gray-100 rounded w-1/4" />
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full" />
                  </div>
                ))
              ) : topAgents.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-6">
                  No agents found.
                </p>
              ) : (
                topAgents.map((agent) => (
                  <div key={agent.agent_id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {getInitial(agent.name)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800 capitalize">
                            {agent.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {agent.total_calls} calls
                          </p>
                        </div>
                      </div>
                      <span
                        className={
                          agent.trend === "up"
                            ? "text-emerald-500"
                            : "text-red-400"
                        }
                      >
                        {agent.trend === "up" ? (
                          <TrendUpIcon />
                        ) : (
                          <TrendDownIcon />
                        )}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full transition-all duration-700"
                          style={{ width: `${agent.success_rate}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 w-8 text-right">
                        {agent.success_rate}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Success Rate</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Call Logs */}
        {/* Call Logs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Call Logs</h2>
              <p className="text-sm text-gray-400">
                {logsLoading ? "Loading..." : `${totalLogs} total calls`}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto px-5">
            {logsLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : callLogs.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-sm">
                No call logs found.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    {[
                      "CALL ID",
                      "DATE & TIME",
                      "AGENT ID",
                      "FROM",
                      "TO",
                      "DIRECTION",
                      "DURATION",
                      "STATUS",
                      "ACTIONS",
                    ].map((h, index, arr) => (
                      <th
                        key={h}
                        className={`px-4 py-3 text-left text-sm font-bold text-gray-900 tracking-wide whitespace-nowrap
                    ${index === 0 ? "rounded-l-full" : ""}
                    ${index === arr.length - 1 ? "rounded-r-full" : ""}
                  `}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {callLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td
                        className="px-4 py-3 text-xs font-semibold text-cyan-500 whitespace-nowrap max-w-[120px] truncate"
                        title={log.call_id}
                      >
                        {log.call_id}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {formatDateTime(log.start_timestamp)}
                      </td>
                      <td
                        className="px-4 py-3 text-xs text-gray-700 font-medium whitespace-nowrap max-w-[120px] truncate"
                        title={log.agent_id}
                      >
                        {log.agent_id}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {log.from_number || "—"}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {log.to_number || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {log.direction ? (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span
                              className={
                                log.direction === "inbound"
                                  ? "text-cyan-500"
                                  : "text-orange-400"
                              }
                            >
                              {log.direction === "inbound" ? "↙" : "↗"}
                            </span>
                            <span className="capitalize">{log.direction}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {formatDuration(log.duration_ms)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusStyle(log.call_status)}`}
                        >
                          {log.call_status}
                        </span>
                      </td>
                      {/* <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-400">
                          {log.recording_url && (
                            <a
                              href={log.recording_url}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-cyan-500 text-cyan-400 transition-colors"
                              title="Play Recording"
                            >
                              <PlayIcon />
                            </a>
                          )}
                          {log.transcript && (
                            <button
                              className="hover:text-cyan-500 text-cyan-400 transition-colors"
                              title="View Transcript"
                            >
                              <DocIcon />
                            </button>
                          )}
                          <button
                            className="hover:text-cyan-500 transition-colors"
                            title="View Details"
                          >
                            <EyeIcon />
                          </button>
                        </div>
                      </td> */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {/* Play / Recording */}
                          <button
                            onClick={() => handlePlayClick(log)}
                            title={
                              log.recording_url
                                ? "Play Recording"
                                : "No recording available"
                            }
                            className={`p-1.5 rounded-lg transition-colors
                              ${
                                log.recording_url
                                  ? "text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600"
                                  : "text-gray-300 hover:bg-gray-100 hover:text-gray-400"
                              }`}
                          >
                            <PlayIcon />
                          </button>

                          {/* Transcript */}
                          <button
                            onClick={() => handleTranscriptClick(log)}
                            title={
                              log.transcript
                                ? "View Transcript"
                                : "No transcript available"
                            }
                            className={`p-1.5 rounded-lg transition-colors
                              ${
                                log.transcript
                                  ? "text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600"
                                  : "text-gray-300 hover:bg-gray-100 hover:text-gray-400"
                              }`}
                          >
                            <DocIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!logsLoading && totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
              <p className="text-xs text-gray-400">
                Page {currentPage} of {totalPages} — {totalLogs} records
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
