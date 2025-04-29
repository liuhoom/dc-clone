#### [English](README.md) | 简体中文

这个应用是给企业排班使用，现阶段简单满足三班倒使用；

## main Layout 不显示

uploadthing 使用的 `import "@uploadthing/react/styles.css"` 问题，修改 tailwind.config.ts 使用 withUt 一样出错误

## invite-modal 获取不到 useModal 的 server；

```ts
const { type, onOpen, isOpen, onClose, data } = useModal()
const server = { data }
```

> `const server = { data }` 错误，正常应该为`const { server } = data`

### Modal 变量的原理

## useOrigin 的 hook

hook 的本质就是全局方法?

## navigator.clipboard 用法

`navigator.clipboard.writeText(inviteUrl)`

> 使用在非 HTTPS 环境不能使用，本地调试也需要使用 localhost 或者 127.0.0.1 才行，不能使用自定义的主机名 Host

## query-string 用法

```ts
const url = qs.stringifyUrl({
  url: `/api/members/${memberId}`,
  query: {
    serverId: server?.id,
  },
})

const response = await axios.patch(url, { role })
```

### 对应 route.ts 用法

- const {allParams} = new URL(req.url); const serverId = allParams.get('serverId') 获取的数据是 url 里面 query 的东西，相当于参数；

- const { role } = await req.json() 获取的数据是 body 里面的数据，url 外的第二个{role}数据

用法也是有不小区别
