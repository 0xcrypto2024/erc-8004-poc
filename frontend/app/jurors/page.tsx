import { client } from "@/lib/client";

const JURORS_QUERY = `
  query {
    jurors {
      items {
        address
        stakedAmount
        isRegistered
      }
    }
  }
`;

export default async function JurorsPage() {
    const { data } = await client.query(JURORS_QUERY, {}).toPromise();
    const jurors = data?.jurors?.items || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Registered Jurors</h1>

            {jurors.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    No jurors registered yet
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jurors.map((juror: any) => (
                        <div key={juror.address} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-purple-400">Juror</h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${juror.isRegistered
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-red-500/20 text-red-400'
                                    }`}>
                                    {juror.isRegistered ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-gray-400">Address:</span>
                                    <p className="text-gray-200 font-mono text-xs truncate">
                                        {juror.address}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Staked:</span>
                                    <p className="text-gray-200 font-semibold">
                                        {(Number(juror.stakedAmount) / 1e18).toFixed(4)} ETH
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2 text-blue-400">About Jurors</h2>
                <p className="text-gray-300">
                    Jurors stake ETH to participate in dispute resolution. They vote on disputed validations
                    and earn rewards for honest participation. Minimum stake: 0.1 ETH.
                </p>
            </div>
        </div>
    );
}
