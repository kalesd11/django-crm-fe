    import React from "react";
    import { useSelector } from "react-redux";
    import StatCard from "./StatCard";
    import ChartCard from "./ChartCard";
    import ActivityCard from "./ActivityCard";
    import PaymentChart from "./PaymentChart";
    import data from "./Store/Data.json";
    import DashboardFooter from "./Utility/Footer";
    import Table from "./Utility/Table";

    function DashboardHome() {
    const user = useSelector((state) => state.auth.user);
    const paymentStats = data.paymentStats;
    const roles = user?.role
        ? Array.isArray(user.role)
        ? user.role
        : [user.role]
        : [];

    const leadActions = () => (
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
    );

    const leadColumns = [
        {
        header: "Users",
        render: (row) => (
            <div className="flex items-center gap-3">
            {row.user.avatar ? (
                <img
                src={row.user.avatar}
                className="w-10 h-10 rounded-full"
                alt=""
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                {row.user.initials}
                </div>
            )}
            <div>
                <p className="font-medium">{row.user.name}</p>
                <p className="text-xs text-gray-500">{row.user.email}</p>
            </div>
            </div>
        ),
        },
        {
        header: "Proposal",
        accessor: "proposal",
        render: (row) => (
            <span className="px-3 py-1 bg-gray-100 rounded-md text-xs">
            {row.proposal}
            </span>
        ),
        },
        {
        header: "Date",
        render: (row) => new Date(row.date).toLocaleString(),
        },
        {
        header: "Status",
        render: (row) => (
            <span
            className={`px-3 py-1 rounded-md text-xs font-medium
            ${
                row.statusType === "success"
                ? "bg-green-100 text-green-600"
                : row.statusType === "info"
                ? "bg-blue-100 text-blue-600"
                : "bg-orange-100 text-orange-600"
            }
            `}
            >
            {row.status}
            </span>
        ),
        },
    ];

    return (
        <div className="space-y-6 h-full bg-gray-50">
        {/* ===== TOP STATS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mr">
            <StatCard title="Total Goals" value="128" change="+12%" />
            <StatCard title="Completed" value="76" change="+8%" />
            <StatCard title="Pending" value="34" change="-4%" />
            <StatCard title="Performance Score" value="92%" change="+3%" />
        </div>

        {/* ===== CHART + ACTIVITY ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Payment Chart */}
            <div className="xl:col-span-2">
            <PaymentChart data={paymentStats}/>
            </div>

            {/* Activity */}
            <ActivityCard />
        </div>

        {/* ===== ADMIN ONLY ===== */}
        {roles.includes("Admin") && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Users" value="54" />
            <StatCard title="Departments" value="8" />
            <StatCard title="Projects" value="19" />
            </div>
        )}

        {/* ===== LEADS SECTION (DURALUX STYLE) ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Leads Overview */}
            <div className="glass-effect border border-blue-500/30 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-6">Leads Overview</h3>

            {/* Donut Chart */}
            <div className="relative flex items-center justify-center">
                <div className="w-56 h-56 rounded-full border-[16px] border-blue-200 relative">
                <div className="absolute inset-0 rounded-full border-[16px] border-blue-600 rotate-[60deg] clip-half"></div>
                <div className="absolute inset-0 rounded-full border-[16px] border-sky-400 rotate-[140deg] clip-half"></div>
                </div>

                <div className="absolute text-center">
                <p className="text-2xl font-bold">1,245</p>
                <p className="text-sm text-gray-500">Total Leads</p>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                    New
                </span>
                <span>520</span>
                </div>
                <div className="flex justify-between">
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-sky-400 rounded-full"></span>
                    In Progress
                </span>
                <span>430</span>
                </div>
                <div className="flex justify-between">
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-200 rounded-full"></span>
                    Converted
                </span>
                <span>295</span>
                </div>
            </div>
            </div>

            
            {/* ===== LATEST LEADS TABLE ===== */}
           <div className="xl:col-span-2">
    <Table
      data={data.latestLeads}
      columns={leadColumns}
      actions={leadActions}
    />
  </div>
        </div>
        <DashboardFooter />
        </div>
    );
    }

    export default DashboardHome;
