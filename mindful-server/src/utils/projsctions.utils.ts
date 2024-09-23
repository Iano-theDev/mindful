// builds an inclusion projection

export const buildInclusionProjection = (fields: string[]):  { [key: string]: number } => {
    return fields.reduce((value, index) => {
        value[index] = 1;
        return value;
    }, {} as  { [key: string]: number })
}

// builds an exclusion projection to hide fileds in results
export const buildExclusionProjection = (fields: string[]):  { [key: string]: number } => {
    return fields.reduce((value, index) => {
        value[index] = 0
        return value;
    }, {} as { [key: string]: number })
}