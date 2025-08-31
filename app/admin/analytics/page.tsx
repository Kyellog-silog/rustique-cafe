import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track your cafe's performance with detailed insights and metrics.</p>
      </div>
      <AnalyticsDashboard />
    </div>
  )
}
