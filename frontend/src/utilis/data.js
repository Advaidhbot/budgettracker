import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from "react-icons/lu";


export const SIDE_MENU_DATA=[
    {
        id:"01",
        label:"Dashboard",
        icon:LuLayoutDashboard,
        route:"/dashboard"
    },
    {
       id:"02",
        label:"Income",
        icon:LuWalletMinimal,
        route:"/income"
    },
    {
        id:"03",
        label:"Expense",
        icon:LuHandCoins,
        route:"/expense"
    },
    {
        id:"06",
        label:"Logout",
        icon:LuLogOut,
        route:"/logout"
    }
]