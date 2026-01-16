export default function SparklineChart({ className }: { className?: string }) {
    return (
        <div className={className}>
            {/* Simple SVG placeholder for a sparkline */}
            <svg
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                className="w-full h-full text-current overflow-visible"
            >
                <path
                    d="M0 10 Q 25 20, 50 10 T 100 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M0 10 Q 25 20, 50 10 T 100 10 V 20 H 0 Z"
                    fill="currentColor"
                    fillOpacity="0.2"
                    stroke="none"
                />
            </svg>
        </div>
    );
}
