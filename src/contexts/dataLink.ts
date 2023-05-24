import attendace from "../assets/attendace.svg";
import leave from "../assets/leave.svg";
import payroll from "../assets/payroll.svg";
import employee from "../assets/employee.svg";
import user from "../assets/user.svg";
import master from "../assets/master.svg";
import global from "../assets/global.svg";
import setting from "../assets/setting.svg";

export const navBarLinks = [
  {
    title: "General",
    links: [
      {
        name: "Attendance Management",
        icon: attendace,
        nameLink: "attendance",
      },
      {
        name: "Leave Management",
        icon: leave,
        nameLink: "leave",
      },
      {
        name: "Payroll Management",
        icon: payroll,
        nameLink: "payroll",
      },
      {
        name: "Employee Management",
        icon: employee,
        nameLink: "employee",
      },
      {
        name: "User Management",
        icon: user,
        nameLink: "user",
      },
      {
        name: "Master Management",
        icon: master,
        nameLink: "master",
      },
    ],
  },
  {
    title: "Advance",
    links: [
      {
        name: "Global Settings",
        icon: global,
        nameLink: "global",
      },
      {
        name: "Settings",
        icon: setting,
        nameLink: "settings",
      },
    ],
  },
];

export const genders = [
  {
    id: 0,
    name: "Male",
    value: 0,
  },
  {
    id: 1,
    name: "Female",
    value: 1,
  },
];
