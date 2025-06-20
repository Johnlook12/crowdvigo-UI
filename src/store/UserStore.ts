import { defineStore } from "pinia";
import api from "../api";
import type { Wallet } from "../components/PayModal/type";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {

    const wallet = ref<Wallet | null>(null);

    const findById = async (id: number) => {
        try{
            const user = await api.get(`/user/${id}`);
            return user.data;
        } catch (err: any) {
            console.error(`Error fetching user with id ${id}:`, err);
            throw err;
        }
    }

    const loadWallet = async (userId: number) => {
        try {
            wallet.value = await findWalletByUserId(userId);
        } catch (err: any) {
            console.error(`Error loading wallet for user with id ${userId}:`, err);
            throw err;
        }
    }

    const findWalletByUserId = async (userId: number) => {
        try {
            const wallet = await api.get(`/wallet/user/${userId}`);
            return wallet.data;
        } catch (err: any) {
            console.error(`Error fetching wallet for user with id ${userId}:`, err);
            throw err;
        }
    }

    return {
        findById,
        findWalletByUserId,
        wallet,
        loadWallet
    }
});