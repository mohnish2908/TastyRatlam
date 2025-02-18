import { apiConnector } from "../apiconnector";

export const result = async (data) => {
    try {
        // console.log(data);
        const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJkbiI6InVpZD0yMzIwNDAzMTAyLG91PXN0dWRlbnRzLGRjPW1hbml0LGRjPWFjLGRjPWluIiwiY29udHJvbHMiOltdLCJvYmplY3RDbGFzcyI6WyJpbmV0T3JnUGVyc29uIiwic2hhZG93QWNjb3VudCIsInBvc2l4QWNjb3VudCJdLCJzbiI6IlJBSiBTSU5HSCBQQU5XQVIiLCJnaXZlbk5hbWUiOiJNT0hOSVNIIiwib3UiOiJzdHVkZW50cyIsInBvc3RhbEFkZHJlc3MiOiJNIDQ1IEMgRE9OR1JFIE5BR0FSIiwibW9iaWxlIjoiOTM5OTExMjQ0MCIsIm1haWwiOiJtb2huaXNocGFud2FyMjlAZ21haWwuY29tIiwic2hhZG93TGFzdENoYW5nZSI6IjE5NjY5IiwiZ2lkTnVtYmVyIjoiMTAwMDAiLCJnZWNvcyI6Ik1PSE5JU0ggUkFKIFNJTkdIIFBBTldBUiIsInVpZCI6IjIzMjA0MDMxMDIiLCJob21lRGlyZWN0b3J5IjoiL2hvbWUvMjMyMDQwMzEwMiIsImxvZ2luU2hlbGwiOiIvYmluL2Jhc2giLCJ1c2VyUGFzc3dvcmQiOiJ7U1NIQX1CdU1udmxkblZaWDFEdFpKZnBoM3JPd3hxc3BzYTJWNiIsImNuIjoiTU9ITklTSCBSQUogU0lOR0ggUEFOV0FSIiwidWlkTnVtYmVyIjoiMjU1NDAiLCJzdHVkZW50SW5mbyI6W3sicGhvbmVfbm8iOiI5Mzk5MTEyNDQwIiwic3R1ZGVudHVpZCI6MzcyNiwiZnVsbF9uYW1lIjoiTU9ITklTSCBSQUogU0lOR0ggICBQQU5XQVIiLCJyb2xsX25vIjoiMjMyMDQwMzEwMiIsImRvYiI6IjI5LzgvMjAwMCIsInBob25lX251bWJlciI6IjkzOTkxMTI0NDAiLCJpbnN0aXR1dGVfZW1haWxfaWQiOiJtb2huaXNocGFud2FyMjlAZ21haWwuY29tIiwiYWNjb3VudHNfcGF5bWVudF90eXBlX2lkIjoxMiwic3RhcnRfc2Vzc2lvbiI6MjAyMywicHJvZ3JhbV9tYXN0ZXJfaWQiOjI4LCJwcm9ncmFtX3R5cGVfaWRfY29kZSI6NjMsImNvZGUiOiJNQ0EiLCJjb2RlX2Rlc2MiOiJNQ0EiLCJwYXltZW50X3R5cGUiOiJHRU4vT0JDL0VXUyAoUEcvUGguRCkiLCJob3N0ZWwiOiJIOS0wMDIifV0sInNlbWVzdGVyX3Rlcm0iOnsic3R1ZGVudHVpZCI6MzcyNiwic2VtZXN0ZXJfcmVnX2NvbXBsZXRpb25fc3RhdHVzIjoiUiIsInNlbWVzdGVyX3Rlcm1fbm9faWRfY29kZSI6Niwic3RhcnRfc2Vzc2lvbiI6MjAyMywicHJvZ3JhbV9tYXN0ZXJfaWQiOjI4LCJ2ZXJzaW9uIjoxLCJjdXJyaWN1bHVtX3N0YXJ0X3Nlc3Npb24iOjIwMjEsInN0YXJ0X3NlbWVzdGVyX3R5cGVfaWRfY29kZSI6Miwic2Vzc2lvbiI6MjAyNCwic2NoZWR1bGVfdHlwZV92YWx1ZSI6IjIiLCJjb2RlX2Rlc2MiOiJTZW1lc3RlciAzIiwicmVnaXN0cmF0aW9uIjoiQ29uZmlybWVkIiwiZGVwdF9pZCI6MzIsInByb2dyYW1fbmFtZSI6Ik1hc3RlciBvZiBDb21wdXRlciBBcHBsaWNhdGlvbnMiLCJkZWdyZWVfbGV2ZWxfaWRfY29kZSI6NDUsInByb2dyYW1fdHlwZV9pZF9jb2RlIjo2M30sInN1YmplY3RzIjpbXSwicHJvZ3JhbSI6W3sicHJvZ3JhbV9tYXN0ZXJfaWQiOjI4LCJwcm9ncmFtX25hbWUiOiJNYXN0ZXIgb2YgQ29tcHV0ZXIgQXBwbGljYXRpb25zIiwic3RhcnRfc2Vzc2lvbiI6MjAyMSwiZGVncmVlX2xldmVsX2lkX2NvZGUiOjQ1LCJwcm9ncmFtX3R5cGVfaWRfY29kZSI6NjN9XX0sImlhdCI6MTczNzAxMDg4OSwiZXhwIjoxNzQ1NjUwODg5fQ.jxwxIO7kFQ5Qf136WLdgW0c2-SLqditp5oKB8PRWgyo"
        const Authorization = `Bearer ${token}`;
        const response = await apiConnector("POST", "https://erpapi.manit.ac.in/api/fetch_register", data,{Authorization},null);
        // console.log(response.data);
        const d = await response.data;
        const roll_no=d[0].roll_no;
        const name=d[0].full_name;
        const sem1_sgpa = parseFloat(d[0].sgpa_cgpa_in_json[0].cgpa);
        const sem2_sgpa=parseFloat(d[1].sgpa_cgpa_in_json[0].cgpa);
        const sem3_sgpa=parseFloat(d[2].sgpa_cgpa_in_json[0].cgpa);
        const cgpa=(sem1_sgpa+sem2_sgpa+sem3_sgpa)/3;
        return {roll_no,name,sem1_sgpa,sem2_sgpa,sem3_sgpa,cgpa};
    } catch (err) {
        console.log(err);
    }
}