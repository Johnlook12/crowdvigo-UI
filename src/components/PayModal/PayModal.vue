<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-[rgba(0,0,0,0.1)]" @click="emit('close')"></div>
        <!-- Modal box -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 max-w-lg z-60 p-4 max-h-[90vh] overflow-y-auto pb-5">
            <div class="flex justify-end cursor-pointer" @click="emit('close')">
                <XMarkIcon class="w-8"></XMarkIcon>
            </div>
            <h2 class="text-3xl font-semibold text-center p-4 pt-0!">
                Recargar wallet
            </h2>
            <span class="text-red-500 ml-2 font-semibold">{{ error }}</span>
            <div class="flex flex-row ">
                <div class="mt-4 border bg-[white] p-6 rounded-xl border-[#e5e5e5]">
                    <h3 class="text-xl mb-5 font-semibold">Cantidad</h3>
                    <div class="flex flex-row items-center">
                        <input type="number" v-model="quantity" class="w-full p-4 mt-4 border bg-[rgba(0,0,0,0.1)] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>            
                <div class="mt-10 ml-10">
                    <h3 class="text-xl font-semibold">Saldo</h3>
                    <div class="space-y-4 mt-5">
                        <div class="flex flex-row space-x-5 items-center">
                            <p class="text-lg">Saldo actual</p>
                            <span>{{ props.wallet.balance.toFixed(2) }}</span>
                        </div>
                        <div class="flex flex-row space-x-5 items-center">
                            <p class="text-lg">Nuevo saldo</p>
                            <span>{{ (props.wallet.balance + (quantity ?? 0)).toFixed(2) }}</span>
                        </div>
                        <button class="ml-4 bg-[#001136] h-15! mt-3 px-3 text-white rounded" @click="handlePayment">Añadir fondos</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import type { Wallet } from './type';
import { usePaymentStore } from '../../store/PaymentStore';

const quantity = ref<number>();
const error = ref<string>('');
const paymentStore = usePaymentStore();

const props = defineProps<{
    wallet: Wallet;
    userId: number;
}>();

const emit = defineEmits(['close']);

const handlePayment = async () => {
    if(!quantity.value || quantity.value <= 5) {
        error.value = 'Por favor, introduce una cantidad válida.';
        return;
    }
    emit('close');
    const amountInCents = Math.round(quantity.value * 100);
    paymentStore.checkout(amountInCents);
    paymentStore.addFundsToWallet(quantity.value, props.userId);
};

</script>

<style scoped lang="scss"></style>
