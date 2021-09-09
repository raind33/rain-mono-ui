import CascadeArea from '../src/index.vue';

import { mount } from '@vue/test-utils';
import Element from 'element-plus';
import flushPromises from 'flush-promises';

describe('测试Area组件', () => {
  let fn:any
  beforeAll(() => {
    fn = jest.fn().mockResolvedValue({
      data: {
        data: {
          list: [],
        },
      },
    });
  });
  it('正常渲染', () => {
    const wrapper = mount(CascadeArea, {
      props: {
        getArea: fn,
        selectedData: []
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('getArea与selectedData应该存在组件实例上', () => {
    const wrapper = mount(CascadeArea, {
      props: {
        getArea: fn,
        selectedData: [1, 2, 3],
      },
    });
    expect(typeof wrapper.props('getArea')).toBe('function');
    expect(wrapper.props('selectedData')).toEqual([1, 2, 3]);
  });

  it('selectedData为[]时，province、city、dist应该为空', () => {
    const wrapper = mount(CascadeArea, {
      props: {
        selectedData: [],
        getArea: fn,
      },
    });

    expect(wrapper.vm.province).toBe(null);
    expect(wrapper.vm.city).toBe(null);
    expect(wrapper.vm.dist).toBe(null);
  });

  it('selectedData为[1,2,3]时，province、city、dist应该分别为1,2,null', () => {
    const wrapper = mount(CascadeArea, {
      props: {
        selectedData: [1, 2],
        getArea: fn,
      },
    });

    expect(wrapper.vm.province).toBe(1);
    expect(wrapper.vm.city).toBe(2);
    expect(wrapper.vm.dist).toBe(null);
  });

  // it('selectedData数组长度为2时，组件初始化时，getProvice、getCity、getDist都被调用', async () => {
  //   const getCity = jest.spyOn(CascadeArea.methods, 'getCity');
  //   const getProvice = jest.spyOn(CascadeArea.methods, 'getProvice');
  //   const getDist = jest.spyOn(CascadeArea.methods, 'getDist');
  //   mount(CascadeArea, {
  //     propsData: {
  //       selectedData: [1, 2],
  //       getArea: fn,
  //     },
  //   });
  //   await flushPromises();
  //   expect(getProvice).toHaveBeenCalled();
  //   expect(getCity).toHaveBeenCalled();
  //   expect(getDist).toHaveBeenCalled();
  // });

  // it('更改province，province setter应该被正确触发', (done) => {
  //   const wrapper = mount(CascadeArea, {
  //     props: {
  //       selectedData: [1, 2],
  //       getArea: fn,
  //     },
  //     listeners: {
  //       'update:selectedData': (x:any) => {
  //         expect(x).toEqual([6]);
  //         done();
  //       },
  //     },
  //   });

  //   const vm = wrapper.vm;
  //   vm.province = 6;
  //   expect(vm.distList.length).toEqual(0);
  //   expect(vm.cityList.length).toEqual(0);
  // });
  // it('更改city，city setter应该被正确触发', (done) => {
  //   const wrapper = mount(CascadeArea, {
  //     propsData: {
  //       selectedData: [1, 2],
  //       getArea: fn,
  //     },
  //     listeners: {
  //       'update:selectedData': (x:any) => {
  //         expect(x).toEqual([1, 6]);
  //         done();
  //       },
  //     },
  //   });

  //   const vm = wrapper.vm;
  //   vm.city = 6;
  //   expect(vm.distList.length).toEqual(0);
  // });
  // it('更改dist，dist setter应该被正确触发', (done) => {
  //   const wrapper = mount(CascadeArea, {
  //     propsData: {
  //       selectedData: [1, 2],
  //       getArea: fn,
  //     },
  //     listeners: {
  //       'update:selectedData': (x) => {
  //         expect(x).toEqual([1, 2, 6]);
  //         done();
  //       },
  //     },
  //   });

  //   const vm = wrapper.vm;
  //   vm.dist = 6;
  // });

  // it('change函数，当val为空，逻辑不执行；val不为空，type对应不同类型，对应函数被执行，并且触发事件监听change', async (done) => {
  //   const wrapper = mount(CascadeArea, {
  //     propsData: {
  //       selectedData: [1, 2],
  //       getArea: fn,
  //     },
  //     listeners: {
  //       change: (x) => {
  //         expect(x).toBe(6);
  //         done();
  //       },
  //     },
  //   });
  //   await flushPromises();
  //   const vm = wrapper.vm;
  //   const fo = (vm.getCity = jest.fn());
  //   const fm = (vm.getDist = jest.fn());

  //   vm.change(6, 'city');
  //   expect(fo).not.toHaveBeenCalled();
  //   expect(fm).toHaveBeenCalledWith(6);
  // });

  // it('当showCity与showDist为false，不发送请求', async () => {
  //   const wrapper = mount(CascadeArea, {
  //     propsData: {
  //       selectedData: [1, 2],
  //       getArea: fn,
  //       showCity: false,
  //       showDist: false,
  //     },
  //   });
  //   await wrapper.setProps({
  //     getArea: jest.fn(),
  //   });
  //   const vm = wrapper.vm;
  //   vm.change(1, 'province');
  //   // vm.change(1, 'city')
  //   expect(vm.getArea).not.toHaveBeenCalled();
  //   vm.change(1, 'city');
  //   expect(vm.getArea).not.toHaveBeenCalled();
  // });

  // it('getProvice、getCity、getDist等返回正确的值', async () => {
  //   const { list, data } = generateData()
  //   const wrapper = mount(CascadeArea, {
  //     propsData: {
  //       selectedData: [1, 2],
  //       getArea: jest
  //         .fn()
  //         .mockReturnValueOnce(data[0])
  //         .mockReturnValueOnce(data[1])
  //         .mockReturnValueOnce(data[2]),
  //     },
  //   });
  //   await flushPromises();
  //   const vm = wrapper.vm;
  //   expect(vm.provinceList).toEqual(list[0]);
  //   expect(vm.cityList).toEqual(list[1]);
  //   expect(vm.distList).toEqual(list[2]);
  // });
});

function generateData () {
  const list = [[1, 2], [1, 2, 3], [1, 2, 3, 4]]

  const data = list.map(item => {
    return {
      data: {
        data: {
          list: item,
        },
      },
    }
  })

  return { list, data }
}
