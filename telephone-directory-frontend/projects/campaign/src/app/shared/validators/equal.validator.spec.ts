// import { FormControl, FormGroup } from '@angular/forms';
// import { equalValidator } from './equal.validator';

// describe('Equal Validator', () => {
//     let group: FormGroup;
//     let groupWithSingleControl: FormGroup;
//     let groupWithUnequalControl: FormGroup;

//     beforeAll(() => {
//         const control1 = new FormControl('abc');
//         const control2 = new FormControl('abc');
//         const control3 = new FormControl('abc');
//         const control4 = new FormControl('abcd');
//         groupWithSingleControl = new FormGroup({ control1 });
//         group = new FormGroup({
//             control1,
//             control2,
//             control3
//         });
//         groupWithUnequalControl = new FormGroup({
//             control1,
//             control2,
//             control3,
//             control4
//         });
//     });

//     it('should have more than one control', () => {
//         expect(groupWithSingleControl.get('control1')).toBeDefined();
//         expect(equalValidator(groupWithSingleControl)).toBeNull();
//     });

//     it('should have equal values in the Form Group', () => {
//         for (let i = 1; i < 4; i++) {
//             expect(group.get(`control${i}`)).toBeDefined();
//         }
//         expect(equalValidator(group)).toBeNull();
//     });

//     it('should have atleast one unequal values in the Form Group', () => {
//         const expectedOutput = {
//             equal: true
//         };
//         for (let i = 1; i < 5; i++) {
//             expect(groupWithUnequalControl.get(`control${i}`)).toBeDefined();
//         }
//         expect(equalValidator(groupWithUnequalControl)).toEqual(expectedOutput);
//     });
// });