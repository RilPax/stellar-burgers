import reducer, {
  registerUser,
  loginUser,
  logoutUser,
  checkUserAuth,
  updateUser
} from './auth-slice';

const initialState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
  isAuth: false
};

describe('authSlice экстра-редьюсеры', () => {
  const user = { name: 'John', email: 'john@mail.com' };

  test('Должен обрабатывать registerUser.pending', () => {
    const state = reducer(initialState, { type: registerUser.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Должен обрабатывать registerUser.fulfilled', () => {
    const state = reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: user
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuth).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Должен обрабатывать registerUser.rejected', () => {
    const state = reducer(initialState, {
      type: registerUser.rejected.type,
      payload: 'Registration error'
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Registration error');
  });

  test('Должен обрабатывать loginUser.pending', () => {
    const state = reducer(initialState, { type: loginUser.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Должен обрабатывать loginUser.fulfilled', () => {
    const state = reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: user
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuth).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Должен обрабатывать loginUser.rejected', () => {
    const state = reducer(initialState, {
      type: loginUser.rejected.type,
      payload: 'Login error'
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Login error');
  });

  test('Должен обрабатывать logoutUser.pending', () => {
    const state = reducer(initialState, { type: logoutUser.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Должен обрабатывать logoutUser.fulfilled', () => {
    const loggedInState = {
      ...initialState,
      user,
      isAuth: true
    };
    const state = reducer(loggedInState, { type: logoutUser.fulfilled.type });
    expect(state.isLoading).toBe(false);
    expect(state.user).toBe(null);
    expect(state.isAuth).toBe(false);
  });

  test('Должен обрабатывать logoutUser.rejected', () => {
    const state = reducer(initialState, {
      type: logoutUser.rejected.type,
      payload: 'Logout error'
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Logout error');
  });

  test('Должен обрабатывать checkUserAuth.pending', () => {
    const state = reducer(initialState, { type: checkUserAuth.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Должен обрабатывать checkUserAuth.fulfilled with user', () => {
    const state = reducer(initialState, {
      type: checkUserAuth.fulfilled.type,
      payload: user
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuth).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Должен обрабатывать checkUserAuth.fulfilled with null', () => {
    const state = reducer(initialState, {
      type: checkUserAuth.fulfilled.type,
      payload: null
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toBe(null);
    expect(state.isAuth).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Должен обрабатывать checkUserAuth.rejected', () => {
    const state = reducer(initialState, {
      type: checkUserAuth.rejected.type,
      payload: 'Check auth failed'
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toBe(null);
    expect(state.isAuth).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Check auth failed');
  });

  test('Должен обрабатывать updateUser.pending', () => {
    const state = reducer(initialState, { type: updateUser.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Должен обрабатывать updateUser.fulfilled', () => {
    const state = reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: user
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
  });

test('Должен обрабатывать updateUser.rejected', () => {
    const state = reducer(initialState, {
      type: updateUser.rejected.type,
      payload: 'Update failed'
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Update failed');
  });
});
