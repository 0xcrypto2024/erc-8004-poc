import { client } from "@/lib/client";
import { gql } from "urql";
import Navigation from "@/components/Navigation";

const DASHBOARD_QUERY = gql`
  query {
    agents { totalCount }
    services { totalCount }
    validations { totalCount }
    disputes { totalCount }
    reputations { totalCount }
  }
`;

export default async function Dashboard() {
    const { data } = await client.query(DASHBOARD_QUERY).toPromise();
    const stats = data || {};
    return (
        <>
            <Navigation />
            <main className="p-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-white">ERC‑8004 Dashboard</h1>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <StatCard title="Agents" count={stats.agents?.totalCount ?? 0} />
                    <StatCard title="Services" count={stats.services?.totalCount ?? 0} />
                    <StatCard title="Validations" count={stats.validations?.totalCount ?? 0} />
                    <StatCard title="Disputes" count={stats.disputes?.totalCount ?? 0} />
                    <StatCard title="Reputations" count={stats.reputations?.totalCount ?? 0} />
                </div>
            </main>
        </>
    );
}

function StatCard({ title, count }: { title: string; count: number }) {
    return (
        <div className="bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-semibold text-white">{count}</p>
        </div>
    );
}
