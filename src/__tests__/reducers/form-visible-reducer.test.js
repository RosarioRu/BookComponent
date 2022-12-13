import formVisibleReducer from '../../reducers/form-visible-reducer';

describe("formVisibleReducer", () => {
  
  test("Should return default state if no action type is recognized", () => {
    expect(formVisibleReducer(false, { type: null })).toEqual(false);
  });

  test("Reducer should toggle form visible from false/true", () => {
    expect(formVisibleReducer(false, { type: "TOGGLE_FORM" })).toEqual(true);
  });

});