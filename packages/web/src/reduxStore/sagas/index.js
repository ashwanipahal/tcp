import { all } from 'redux-saga/effects';
import HomePageSaga from "../../components/features/content/HomePage/container/HomePage.saga";
import ProductListingPageSaga from "@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.saga";

export default function* rootSaga() {
    yield all([
        HomePageSaga(), 
        ProductListingPageSaga() 
    ]);
}