import React from 'react';

// ====== interfaces =======

interface Param {
  id: number;
  name: string;
  type?: 'string';
}
interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  colorValue: string;
}

interface RenderParam {
  paramId: number;
  paramName: string;
  paramValue: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
  allParams?: RenderParam[];
}

// ======= props types =======

interface ParamEditorProps {
  params: Param[];
  model: Model;
}

interface ParamItemProps extends RenderParam {}

// ======= end props types =======

// ======= state types =======

interface StateTextInput {
  stateInput: string;
}

// ======= end state types =======

// ====== end interfaces =======

// ======= consts ===========

const params: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
];
const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
};

// ======= end consts ===========

// ======= update store ===========

const updateParams = (id: number, newValue: string) => {
  const foundParamInParams = params.find((el) => el.id === id);
  if (foundParamInParams) {
    foundParamInParams.name = newValue;
  }
};

// ======= end update store ===========

// ======= classes ===========

class ParamItem extends React.Component<ParamItemProps, StateTextInput> {
  state: StateTextInput = { stateInput: this.props.paramValue };

  handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ stateInput: e.target.value });
    updateParams(this.props.paramId, e.target.value);
  };

  render(): React.ReactNode {
    return (
      <label>
        {this.props.paramName}
        <input
          type="text"
          value={this.state.stateInput}
          onChange={this.handleChangeInput}
        />
      </label>
    );
  }
}

class ParamEditor extends React.Component<ParamEditorProps> {
  public getModel(): Model {
    const allParams: RenderParam[] = this.props.model.paramValues.map(
      (modelParam) => {
        const foundParam = this.props.params.find(
          (param) => param.id === modelParam.paramId
        );
        return {
          paramId: modelParam.paramId,
          paramName: foundParam ? foundParam.name : '',
          paramValue: modelParam.value,
        };
      }
    );
    return { ...this.props.model, allParams };
  }

  render(): React.ReactNode {
    return (
      <form>
        {this.getModel().allParams?.map((param) => (
          <ParamItem key={param.paramId} {...param} />
        ))}
      </form>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ParamEditor params={params} model={model} />
    </div>
  );
}

export default App;
