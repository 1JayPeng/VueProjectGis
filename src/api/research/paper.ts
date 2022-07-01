import request from '/@/utils/request';

// 查询岗位列表
export function listPaper(query:any) {
	return request({
		url: '/device/paper/list',
		method: 'get',
		params: query
	})
}

// 查询岗位详细
export function getPaper(Id:number) {
	return request({
		url: '/device/falldowndevice/detail?Id=' + Id,
		method: 'get'
	})
}
export function delProject(Id:number) {
	return request({
		url: '/device/falldowndevice/detail?Id=' + Id,
		method: 'get'
	})
}
// 新增岗位
export function addPaper(data:any) {
	return request({
		url: '/device/paper/add',
		method: 'post',
		data: data
	})
}

// 修改岗位
export function updatePaper(data:any) {
	return request({
		url: '/device/paper/update',
		method: 'post',
		data: data
	})
}

// 删除岗位
export function delPaper(Id: string) {
	return request({
		url: '/device/paper/delete',
		method: 'post',
		data: Id
	})
}