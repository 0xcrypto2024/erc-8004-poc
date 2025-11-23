import { client } from "@/lib/client";

const DISPUTES_QUERY = `
  query {
    disputes {
      items {
        id
        taskId
        challenger
        votesFor
        votesAgainst
        resolved
        ruling
      }
    }
  }
`;

export default async function DisputesPage() {
    const { data } = await client.query(DISPUTES_QUERY, {}).toPromise();
    const disputes = data?.disputes?.items || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dispute Resolution</h1>

            {disputes.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    No disputes yet
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {disputes.map((dispute: any) => {
                        const totalVotes = Number(dispute.votesFor) + Number(dispute.votesAgainst);
                        const forPercentage = totalVotes > 0 ? (Number(dispute.votesFor) / totalVotes) * 100 : 0;

                        return (
                            <div key={dispute.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-orange-400">
                                            Dispute #{dispute.id}
                                        </h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Task #{dispute.taskId}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded text-xs font-medium ${dispute.resolved
                                            ? 'bg-gray-500/20 text-gray-400'
                                            : 'bg-orange-500/20 text-orange-400'
                                        }`}>
                                        {dispute.resolved ? 'Resolved' : 'Active'}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-sm text-gray-400">Challenger:</span>
                                        <p className="text-gray-200 font-mono text-xs truncate">
                                            {dispute.challenger}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-green-400">Valid: {dispute.votesFor}</span>
                                            <span className="text-red-400">Invalid: {dispute.votesAgainst}</span>
                                        </div>
                                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-green-500 to-green-400 h-full transition-all"
                                                style={{ width: `${forPercentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    {dispute.resolved && (
                                        <div className="pt-4 border-t border-gray-800">
                                            <span className="text-sm text-gray-400">Final Ruling:</span>
                                            <p className={`text-lg font-semibold mt-1 ${dispute.ruling ? 'text-green-400' : 'text-red-400'
                                                }`}>
                                                {dispute.ruling ? 'Valid ✓' : 'Invalid ✗'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
