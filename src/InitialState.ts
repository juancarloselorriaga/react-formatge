class InitialStateSingleton {
  private static instance: InitialStateSingleton
  private inViewFormInitialState = ''

  public static getInstance(): InitialStateSingleton {
    if (!InitialStateSingleton.instance) {
      InitialStateSingleton.instance = new InitialStateSingleton()
    }

    return InitialStateSingleton.instance
  }

  public getInViewFormInitialState() {
    return this.inViewFormInitialState
  }

  public setInitialState(initialState: string) {
    this.inViewFormInitialState = initialState
  }
}

export default InitialStateSingleton.getInstance()
