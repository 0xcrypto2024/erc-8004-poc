import { client } from "@/lib/client";

const VALIDATIONS_QUERY = `
  query {
    validations {
      items {
        id
        taskId
        agentId
        isValidated
        isValid
        validator
        disputeId
        agent {
          id
          address
        }
      }
    }
  }
`;

export default async function ValidationsPage() {
    const { data } = await client.query(VALIDATIONS_QUERY, {}).toPromise();
    const validations = data?.validations?.items || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Task Validations</h1>

            {validations.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    No validations yet
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Task ID</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Agent</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Validator</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Result</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium">Disputed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {validations.map((validation: any) => (
                                <tr key={validation.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                                    <td className="py-4 px-4 font-mono text-sm">
                                        #{validation.taskId}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="text-sm">
                                            <p className="text-blue-400">Agent #{validation.agent.id}</p>
                                            <p className="text-gray-500 text-xs font-mono truncate max-w-[150px]">
                                                {validation.agent.address}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <p className="font-mono text-xs truncate max-w-[150px]">
                                            {validation.validator}
                                        </p>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${validation.isValidated
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {validation.isValidated ? 'Validated' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        {validation.isValidated ? (
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${validation.isValid
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                {validation.isValid ? 'Valid' : 'Invalid'}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 text-xs">-</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4">
                                        {validation.disputeId ? (
                                            <span className="text-orange-400 text-xs font-medium">
                                                Dispute #{validation.disputeId}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 text-xs">No</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
