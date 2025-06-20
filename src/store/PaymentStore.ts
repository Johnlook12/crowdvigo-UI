import { defineStore } from "pinia";
import { loadStripe } from "@stripe/stripe-js";
import api from "../api";
import type { Contribution } from "./type";

const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const usePaymentStore = defineStore("payment", () => {

    async function checkout(amount: number) {
        const currentPath = window.location.pathname + window.location.search;
        const { data } = await api.post('/checkout/session', {
            amount,
            successUrl: window.location.origin + currentPath,
            cancelUrl: window.location.origin + currentPath
        });

        const stripe = await stripePromise;
        await stripe!.redirectToCheckout({ sessionId: data.sessionId });
    }

    async function addFundsToWallet(amount: number, userId: number) {
        try {
            const { data } = await api.put(`/wallet/user/${userId}/addFunds`, { amount });
            return data;
        } catch (error) {
            console.error("Error adding funds to wallet:", error);
            throw error;
        }
    }

    async function withdrawFundsFromWallet(amount: number, userId: number) {
        try {
            const { data } = await api.put(`/wallet/user/${userId}/withdrawFunds`, { amount });
            return data;
        } catch (error) {
            console.error("Error withdrawing funds from wallet:", error);
            throw error;
        }
    }

    async function addContribution(contribution: Contribution) {
        try {
            const { data } = await api.post('/contribution', contribution);
            return data;
        } catch (error) {
            console.error("Error adding contribution:", error);
            throw error;
        }
    }

    return {
        checkout,
        addFundsToWallet,
        withdrawFundsFromWallet,
        addContribution
    };
});