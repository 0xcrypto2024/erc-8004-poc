import { client } from "@/lib/client";

const SERVICES_QUERY = `
  query {
    services {
      items {
        id
        agentId
        metadataURI
        active
        agent {
          id
          address
        }
      }
    }
  }
`;

export default async function ServicesPage() {
    const { data } = await client.query(SERVICES_QUERY, {}).toPromise();
    const services = data?.services?.items || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Services Marketplace</h1>

            {services.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    No services registered yet
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service: any) => (
                        <div key={service.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-blue-500 transition-colors">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-semibold text-blue-400 truncate">
                                    {service.id}
                                </h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${service.active
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-gray-500/20 text-gray-400'
                                    }`}>
                                    {service.active ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-gray-400">Provider:</span>
                                    <p className="text-gray-200 font-mono truncate">
                                        Agent #{service.agent.id}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Address:</span>
                                    <p className="text-gray-200 font-mono text-xs truncate">
                                        {service.agent.address}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Metadata:</span>
                                    <a
                                        href={service.metadataURI}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 text-xs truncate block"
                                    >
                                        {service.metadataURI}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
