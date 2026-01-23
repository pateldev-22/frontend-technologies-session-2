import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "./AxiosClient";

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (product) => {
            const {data} = await api.post("/products/add",product);
            console.log(data);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["products"]});
        },
    })
};
