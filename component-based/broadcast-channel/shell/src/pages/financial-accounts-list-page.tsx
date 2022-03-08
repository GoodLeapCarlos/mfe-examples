import FinancialAccountListSideBar from 'financial_app/FinancialAccountListSideBar';
import FinancialAccountsListDetails from 'financial_app/FinancialAccountsListDetails';

export default function FinancialAccountsListPage() {

    return (<div className='border-4 border-red-300'>

<div className='flex'>
<FinancialAccountListSideBar></FinancialAccountListSideBar>
<FinancialAccountsListDetails></FinancialAccountsListDetails>
</div>

    </div>)
}