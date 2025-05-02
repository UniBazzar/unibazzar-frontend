const dummyAccounts = [
    { id: 1, name: "Abel Tesfaye", email: "abel@unibazzar.et", role: "Seller", status: "Active" },
    { id: 2, name: "Liya Kassa", email: "liya@unibazzar.et", role: "Buyer", status: "Pending" },
    { id: 3, name: "Samuel Dawit", email: "samuel@unibazzar.et", role: "Seller", status: "Suspended" },
    { id: 4, name: "Hana Getachew", email: "hana@unibazzar.et", role: "Buyer", status: "Active" },
  ];
  
  const statusStyles = {
    Active: "text-green-400 bg-green-900",
    Pending: "text-yellow-300 bg-yellow-900",
    Suspended: "text-red-400 bg-red-900",
  };
  
  const AccountTable = () => {
    return (
      <div className="bg-gray-800 p-5 rounded-xl shadow-lg mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Accounts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-200">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyAccounts.map((account) => (
                <tr key={account.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-3">{account.name}</td>
                  <td className="px-4 py-3">{account.email}</td>
                  <td className="px-4 py-3">{account.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[account.status] || "bg-gray-600"
                      }`}
                    >
                      {account.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default AccountTable;
  