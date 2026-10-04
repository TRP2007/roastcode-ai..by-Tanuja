"use client";

import { useRef, useState } from "react";

type Issue = {
  severity: "FATAL BUG" | "CODE SMELL" | "OPTIMIZATION";
  title: string;
  explanation: string;
  fix: string;
};

type Complexity = {
  time: string;
  space: string;
  explanation: string;
};

type TestCase = {
  input: string;
  expectedOutput: string;
  purpose: string;
};

type RoastResult = {
  score: number;
  summary: string;
  roast: string;
  issues: Issue[];
  optimization: string;
  complexity: Complexity;
  fixedCode: string;
  testCases: TestCase[];
};

const sampleCode = `def add_numbers(a, b):
    return a - b

print(add_numbers(10, 5))`;

const extensionLanguageMap: Record<string, string> = {
  py: "Python",
  js: "JavaScript",
  jsx: "JavaScript",
  ts: "TypeScript",
  tsx: "TypeScript",
  java: "Java",
  cpp: "C++",
  cc: "C++",
  cxx: "C++",
  c: "C++",
  go: "Go",
  rs: "Rust",
};

const getLanguageFromFileName = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  return extension && extensionLanguageMap[extension]
    ? extensionLanguageMap[extension]
    : null;
};

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [code, setCode] = useState(sampleCode);
  const [originalCode, setOriginalCode] = useState("");
  const [fileName, setFileName] = useState("main.py");

  const [language, setLanguage] = useState("Python");
  const [roastLevel, setRoastLevel] = useState("Balanced");
  const [persona, setPersona] = useState("Friendly Mentor");
  const [errorMessage, setErrorMessage] = useState("");

  const [result, setResult] = useState<RoastResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "review" | "diff" | "fix" | "tests"
  >("review");

  const [dragging, setDragging] = useState(false);

  const handleRoast = async () => {
    if (!code.trim()) {
      setError("bro... your editor is literally empty 💀");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setOriginalCode(code);
    setActiveTab("review");

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          roastLevel,
          persona,
          errorMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong 💀"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSample = () => {
    setCode(sampleCode);
    setFileName("main.py");
    setLanguage("Python");
    setResult(null);
    setOriginalCode("");
    setError("");
    setActiveTab("review");
  };

  const handleClear = () => {
    setCode("");
    setFileName("untitled");
    setResult(null);
    setOriginalCode("");
    setError("");
    setActiveTab("review");
  };

  const handleApplyFix = () => {
    if (!result?.fixedCode) return;

    setCode(result.fixedCode);
    setResult(null);
    setActiveTab("review");
    setError("");
  };

  const handleCopy = async () => {
    if (!result?.fixedCode) return;

    try {
      await navigator.clipboard.writeText(result.fixedCode);
    } catch {
      setError("Clipboard access failed.");
    }
  };

  const readFile = (file: File) => {
    const detectedLanguage = getLanguageFromFileName(file.name);

    if (!detectedLanguage) {
      setError(
        "Unsupported file type. Use Python, JavaScript, TypeScript, Java, C/C++, Go or Rust."
      );
      return;
    }

    if (file.size > 100_000) {
      setError("File is too large. Please upload a file under 100 KB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;

      if (typeof content !== "string") {
        setError("Unable to read this file.");
        return;
      }

      setCode(content.slice(0, 12000));
      setFileName(file.name);
      setLanguage(detectedLanguage);
      setResult(null);
      setOriginalCode("");
      setError("");
      setActiveTab("review");
    };

    reader.onerror = () => {
      setError("Unable to read this file.");
    };

    reader.readAsText(file);
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      readFile(file);
    }

    event.target.value = "";
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      readFile(file);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-[-100px] top-[30%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[40%] h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        {/* Navbar */}
        <nav className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-sm font-black shadow-lg shadow-fuchsia-500/20">
              RC
            </div>

            <div>
              <p className="text-sm font-black tracking-tight">
                ROASTCODE
              </p>

              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                AI Code Review
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-[11px] font-bold text-emerald-300">
              GEMINI ONLINE
            </span>
          </div>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black tracking-wider text-zinc-400">
            BETA
          </span>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-4xl py-8 text-center sm:py-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-bold text-fuchsia-300">
            <span>⚡</span>
            YOUR CODE. OUR JUDGEMENT.
          </div>

          <h1 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            Code review,
            <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
              but make it fun.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Drop your code. Let AI find the bugs,
            expose the questionable decisions,
            and hand you the fixed version.
          </p>
        </section>

        {/* Main application */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111113] shadow-2xl shadow-black/40">
          {/* Controls */}
          <div className="grid gap-4 border-b border-white/10 p-4 sm:p-5 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                Language
              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#19191D] px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-violet-400/60"
              >
                <option>Python</option>
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Java</option>
                <option>C++</option>
                <option>Go</option>
                <option>Rust</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                Vibe
              </label>

              <select
                value={roastLevel}
                onChange={(e) => setRoastLevel(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#19191D] px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-violet-400/60"
              >
                <option>Balanced</option>
                <option>Direct</option>
                <option>Brutal</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                Reviewer
              </label>

              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#19191D] px-4 py-3 text-sm font-bold text-white outline-none transition focus:border-violet-400/60"
              >
                <option>Friendly Mentor</option>
                <option>Strict Reviewer</option>
                <option>Senior Engineer</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleRoast}
                disabled={loading}
                className="group w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-3 font-black text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    SCANNING...
                  </span>
                ) : (
                  <span>
                    ANALYZE CODE
                    <span className="ml-2">
                      →
                    </span>
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Error input */}
          <div className="border-b border-white/10 p-4 sm:p-5">
            <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
              Got an error? Drop it here{" "}
              <span className="text-zinc-700">
                (optional)
              </span>
            </label>

            <textarea
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              placeholder="Type / paste your error or stack trace..."
              className="min-h-[80px] w-full resize-y rounded-xl border border-white/10 bg-[#0D0D0F] px-4 py-3 font-mono text-sm text-zinc-300 outline-none transition placeholder:text-zinc-700 focus:border-violet-400/50"
            />
          </div>

          {/* Workspace */}
          <div className="grid lg:grid-cols-2">
            {/* Editor */}
            <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
              {/* Editor header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <span className="max-w-[180px] truncate text-xs font-bold text-zinc-400">
                    {fileName}
                  </span>
                </div>

                <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold text-zinc-500">
                  {code.length.toLocaleString()} / 12K
                </span>
              </div>

              {/* Upload / Drop */}
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`border-b border-white/10 p-3 transition ${dragging
                  ? "bg-fuchsia-500/10"
                  : "bg-[#0D0D0F]"
                  }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-white/10 px-4 py-3">
                  <div>
                    <p className="text-xs font-bold text-zinc-300">
                      {dragging
                        ? "DROP IT HERE"
                        : "Upload a source file"}
                    </p>

                    <p className="mt-1 text-[10px] text-zinc-600">
                      .py .js .ts .tsx .java .cpp .c .go .rs
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black text-zinc-300 transition hover:bg-white/10"
                  >
                    SELECT FILE
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".py,.js,.jsx,.ts,.tsx,.java,.cpp,.cc,.cxx,.c,.go,.rs"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>

              {/* Code editor */}
              <div className="relative bg-[#09090B]">
                <div className="absolute bottom-0 left-0 top-0 w-12 select-none border-r border-white/5 bg-[#0D0D0F] pt-5 text-center font-mono text-xs leading-7 text-zinc-700">
                  {code.split("\n").map((_, index) => (
                    <div key={index}>
                      {index + 1}
                    </div>
                  ))}
                </div>

                <textarea
                  value={code}
                  onChange={(e) =>
                    setCode(
                      e.target.value.slice(0, 12000)
                    )
                  }
                  spellCheck={false}
                  placeholder="// paste your code here..."
                  className="min-h-[520px] w-full resize-none bg-transparent py-5 pl-16 pr-5 font-mono text-sm leading-7 text-zinc-200 outline-none placeholder:text-zinc-700"
                />
              </div>

              {/* Editor actions */}
              <div className="flex flex-wrap gap-2 border-t border-white/10 p-4">
                <button
                  onClick={handleSample}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-zinc-300 transition hover:bg-white/10"
                >
                  ✨ LOAD SAMPLE
                </button>

                <button
                  onClick={handleClear}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-zinc-300 transition hover:bg-white/10"
                >
                  CLEAR
                </button>

                <span className="ml-auto self-center text-[10px] font-bold text-zinc-600">
                  {language}
                </span>
              </div>
            </div>

            {/* AI panel */}
            <div className="min-h-[600px]">
              {/* Tabs */}
              <div className="grid grid-cols-4 border-b border-white/10">
                <button
                  onClick={() => setActiveTab("review")}
                  className={`px-2 py-3 text-[10px] font-black transition sm:text-xs ${activeTab === "review"
                    ? "border-b-2 border-fuchsia-400 text-fuchsia-300"
                    : "text-zinc-500 hover:text-white"
                    }`}
                >
                  AI REVIEW
                </button>

                <button
                  onClick={() => setActiveTab("diff")}
                  disabled={!result}
                  className={`px-2 py-3 text-[10px] font-black transition sm:text-xs ${activeTab === "diff"
                    ? "border-b-2 border-emerald-400 text-emerald-300"
                    : "text-zinc-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    }`}
                >
                  DIFF
                </button>

                <button
                  onClick={() => setActiveTab("fix")}
                  disabled={!result}
                  className={`px-2 py-3 text-[10px] font-black transition sm:text-xs ${activeTab === "fix"
                    ? "border-b-2 border-violet-400 text-violet-300"
                    : "text-zinc-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    }`}
                >
                  FIXED CODE
                </button>

                <button
                  onClick={() => setActiveTab("tests")}
                  disabled={!result}
                  className={`px-2 py-3 text-[10px] font-black transition sm:text-xs ${activeTab === "tests"
                    ? "border-b-2 border-cyan-400 text-cyan-300"
                    : "text-zinc-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    }`}
                >
                  TESTS
                </button>
              </div>

              {/* Empty */}
              {!result && !loading && !error && (
                <div className="flex min-h-[600px] items-center justify-center p-8 text-center">
                  <div className="max-w-sm">
                    <div className="mb-6 text-6xl opacity-70">
                      {"</>"}
                    </div>

                    <h2 className="text-2xl font-black">
                      Nothing sus... yet.
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-zinc-500">
                      Paste code or upload a file.
                      RoastCode will inspect it.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-zinc-500">
                        BUG DETECTION
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-zinc-500">
                        COMPLEXITY
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-zinc-500">
                        AUTO FIX
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="flex min-h-[600px] items-center justify-center p-8 text-center">
                  <div>
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 text-2xl text-fuchsia-300">
                      ⚡
                    </div>

                    <h2 className="text-2xl font-black">
                      Cookin&apos;...
                    </h2>

                    <p className="mt-3 text-sm text-zinc-500">
                      AI is reading your code and judging
                      your life choices.
                    </p>

                    <div className="mx-auto mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && !loading && (
                <div className="p-5">
                  <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
                    <div className="flex items-center gap-2">
                      <span>💀</span>

                      <span className="text-sm font-black text-red-300">
                        SOMETHING BROKE
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {error}
                    </p>

                    <button
                      onClick={() => setError("")}
                      className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-zinc-300"
                    >
                      DISMISS
                    </button>
                  </div>
                </div>
              )}

              {/* Results */}
              {result && !loading && (
                <div className="max-h-[900px] overflow-y-auto p-4 sm:p-5">
                  {/* Review */}
                  {activeTab === "review" && (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                              Overall Score
                            </p>

                            <p className="mt-2 text-sm text-zinc-500">
                              code quality check
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-5xl font-black">
                              {result.score}
                            </span>

                            <span className="text-lg font-bold text-zinc-600">
                              /100
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400"
                            style={{
                              width: `${Math.min(
                                Math.max(
                                  result.score,
                                  0
                                ),
                                100
                              )}%`,
                            }}
                          />
                        </div>

                        <p className="mt-4 text-sm leading-6 text-zinc-400">
                          {result.summary}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/5 p-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-fuchsia-300">
                          The verdict 💀
                        </p>

                        <p className="mt-3 text-base font-bold leading-7 text-zinc-200">
                          {result.roast}
                        </p>
                      </div>

                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-lg font-black">
                            Issues
                          </h3>

                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black text-zinc-500">
                            {result.issues.length}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {result.issues.length === 0 ? (
                            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm font-bold text-emerald-300">
                              ✅ No major issues found.
                            </div>
                          ) : (
                            result.issues.map(
                              (issue, index) => (
                                <details
                                  key={index}
                                  className="group rounded-2xl border border-white/10 bg-white/[0.02]"
                                >
                                  <summary className="cursor-pointer list-none p-4">
                                    <div className="flex items-center justify-between gap-3">
                                      <div>
                                        <span className="rounded-full bg-white/5 px-2.5 py-1 text-[9px] font-black text-zinc-500">
                                          {issue.severity}
                                        </span>

                                        <h4 className="mt-2 text-sm font-black">
                                          {issue.title}
                                        </h4>
                                      </div>

                                      <span className="text-lg text-zinc-600 transition group-open:rotate-45">
                                        +
                                      </span>
                                    </div>
                                  </summary>

                                  <div className="border-t border-white/10 p-4">
                                    <p className="text-sm leading-6 text-zinc-400">
                                      {issue.explanation}
                                    </p>

                                    <div className="mt-4 rounded-xl bg-emerald-400/5 p-3">
                                      <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                                        FIX
                                      </p>

                                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                                        {issue.fix}
                                      </p>
                                    </div>
                                  </div>
                                </details>
                              )
                            )
                          )}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                          Optimization
                        </p>

                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                          {result.optimization}
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                            Time Complexity
                          </p>

                          <p className="mt-3 font-mono text-xl font-black text-cyan-300">
                            {result.complexity.time}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                            Space Complexity
                          </p>

                          <p className="mt-3 font-mono text-xl font-black text-violet-300">
                            {result.complexity.space}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                          Complexity Notes
                        </p>

                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                          {result.complexity.explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Diff */}
                  {activeTab === "diff" && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                          Before → After
                        </p>

                        <h3 className="mt-1 text-lg font-black">
                          What changed?
                        </h3>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="overflow-hidden rounded-2xl border border-red-400/20">
                          <div className="border-b border-red-400/20 bg-red-400/5 px-4 py-3">
                            <span className="text-xs font-black text-red-300">
                              BEFORE
                            </span>
                          </div>

                          <pre className="min-h-[450px] overflow-auto bg-[#08080A] p-4 font-mono text-sm leading-7 text-zinc-400">
                            <code>
                              {originalCode || code}
                            </code>
                          </pre>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-emerald-400/20">
                          <div className="border-b border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
                            <span className="text-xs font-black text-emerald-300">
                              AFTER
                            </span>
                          </div>

                          <pre className="min-h-[450px] overflow-auto bg-[#08080A] p-4 font-mono text-sm leading-7 text-emerald-300">
                            <code>
                              {result.fixedCode}
                            </code>
                          </pre>
                        </div>
                      </div>

                      <button
                        onClick={handleApplyFix}
                        className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-3 text-sm font-black transition hover:opacity-90"
                      >
                        APPLY IMPROVED CODE
                      </button>
                    </div>
                  )}

                  {/* Fixed code */}
                  {activeTab === "fix" && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                            AI-generated
                          </p>

                          <h3 className="mt-1 text-lg font-black">
                            Cleaner code ✨
                          </h3>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={handleCopy}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-zinc-300 hover:bg-white/10"
                          >
                            COPY
                          </button>

                          <button
                            onClick={handleApplyFix}
                            className="rounded-lg bg-gradient-to-r from-fuchsia-500 to-violet-600 px-3 py-2 text-xs font-black"
                          >
                            APPLY FIX
                          </button>
                        </div>
                      </div>

                      <pre className="max-h-[650px] overflow-auto rounded-2xl border border-white/10 bg-[#08080A] p-5 font-mono text-sm leading-7 text-zinc-300">
                        <code>{result.fixedCode}</code>
                      </pre>
                    </div>
                  )}

                  {/* Tests */}
                  {activeTab === "tests" && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-600">
                          AI-generated
                        </p>

                        <h3 className="mt-1 text-lg font-black">
                          Test cases 🧪
                        </h3>
                      </div>

                      {result.testCases.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 p-5 text-sm text-zinc-500">
                          No test cases were generated.
                        </div>
                      ) : (
                        result.testCases.map(
                          (test, index) => (
                            <div
                              key={index}
                              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                            >
                              <div className="mb-4 flex items-center justify-between">
                                <span className="text-xs font-black">
                                  TEST {index + 1}
                                </span>

                                <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[9px] font-black text-cyan-300">
                                  GENERATED
                                </span>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-zinc-600">
                                    INPUT
                                  </p>

                                  <pre className="overflow-auto rounded-xl bg-[#08080A] p-3 font-mono text-xs text-zinc-300">
                                    {test.input}
                                  </pre>
                                </div>

                                <div>
                                  <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-zinc-600">
                                    EXPECTED
                                  </p>

                                  <pre className="overflow-auto rounded-xl bg-[#08080A] p-3 font-mono text-xs text-emerald-300">
                                    {test.expectedOutput}
                                  </pre>
                                </div>

                                <p className="text-sm leading-6 text-zinc-500">
                                  {test.purpose}
                                </p>
                              </div>
                            </div>
                          )
                        )
                      )}
                    </div>
                  )}

                  {/* New review */}
                  <button
                    onClick={() => {
                      setResult(null);
                      setActiveTab("review");
                    }}
                    className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-zinc-300 transition hover:bg-white/10"
                  >
                    NEW REVIEW
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-600">
              Engine
            </p>

            <p className="mt-1 text-sm font-black">
              Gemini AI
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-600">
              Max Code
            </p>

            <p className="mt-1 text-sm font-black">
              12K chars
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-600">
              Languages
            </p>

            <p className="mt-1 text-sm font-black">
              7+
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-600">
              Input
            </p>

            <p className="mt-1 text-sm font-black">
              Code + Files
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700">
          ROASTCODE AI · DEBUG BETTER · SHIP CLEANER
        </footer>
      </div>
    </main>
  );
}