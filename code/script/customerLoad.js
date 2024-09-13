import http from 'k6/http';
import {check} from "k6";
import { login } from '../common/Auth/merchantAuth.js';
import { getStoreToken } from '../common/Auth/storeAuth.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 10,
    duration: '10s',
    // thresholds:{
    //     http_req_duration: ['p(90)<30'],
    //     http_req_failed:['rate<0.01'],
    //     checks:['rate==0.1']
    // }
}
const customerQuery = 'query{customers{edges{cursor node{id firstName lastName email phoneCountry phoneNumber mailingEnabled mailingEnabledAt tags notes shippingAddress{id firstName lastName phoneNumber company address apartment city province provinceCode country countryCode postal isDefault}createdAt updatedAt orderCounts moneySpent lastOrder{id customerEmail customerPhone note tags createdAt updatedAt billingAddress{id firstName lastName phoneNumber company address apartment city province provinceCode country countryCode postal isDefault}shippingAddress{id firstName lastName phoneNumber company address apartment city province provinceCode country countryCode postal isDefault}lineItems{id name quantity sku originalUnitPrice originalTotalPrice product{id title vendor tags description handle status type hasOnlyDefaultVariant totalInventory tracksInventory options createdAt templateSuffix}variant{id title displayName inventoryQuantity inventoryPolicy sku barCode selectedOptions weight costPerItem trackInventory}image{mediaType alt}}customer{id firstName lastName email phoneCountry phoneNumber mailingEnabled mailingEnabledAt tags notes shippingAddress{id firstName lastName phoneNumber company address apartment city province provinceCode country countryCode postal isDefault}createdAt updatedAt orderCounts moneySpent}currency status financialStatus fulfillmentStatus totalPrice transactions{id amount kind status createdAt processedAt settlementCurrency settlementCurrencyRate}refunds{id transaction{id amount kind status createdAt processedAt settlementCurrency settlementCurrencyRate}createdAt updatedAt}}}}pageInfo{hasNextPage hasPreviousPage}}}'

export default function testSuite() {
    const access_token = JSON.stringify(login().cookies.access_token[0].value);
    const referesh_token = JSON.stringify(login().cookies.refresh_token[0].value);
    let response = getStoreToken(access_token, referesh_token)
    let storeToken = response.store_access_token;
    let storeRefreshToken = response.store_refresh_token;
    const headers = {
        'Content-Type': 'application/json',
        'Cookie': 'store_access_token=' + storeToken + '; store_refresh_token=' + storeRefreshToken
    };


    const customerResponse = http.post(
        'https://sangam.test.unistore.tech/graphql',
        JSON.stringify({
            query: customerQuery
        }),
        { headers: headers }
    );
    check(customerResponse, {
        'status is 200': (r) => r.status === 200

    })

}
export function handleSummary(data) {
    console.log('Preparing the end-of-test summary...');
    
  
    return {
      '../../Reports/report_`${new Date(Date.now)}`.html': htmlReport(data), // Transform summary and save it as a JUnit XML...
    };
}