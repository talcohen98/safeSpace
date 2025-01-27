

const useValidCategory = (category) => {

    const validCategories = ["Sexual-Harassment", "Eating-Disorders", "Cyber-Bullying","All-Questions"];
    return validCategories.includes(category);
};

export default useValidCategory;