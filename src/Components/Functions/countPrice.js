export const countPrice = (order) => {
    const countOptions = order.options.filter( item => item.checked ).length;

    const optionsPrice = (order.price * 0.1) * countOptions;

    return ((order.price * order.count) + optionsPrice); 
    
};