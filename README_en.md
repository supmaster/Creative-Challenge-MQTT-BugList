
[![License](https://img.shields.io/badge/license-Apache%202-green.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Build Status](https://travis-ci.org/xialonghua/kotmvp.svg?branch=master)](https://travis-ci.org/supmaster/Creative-Challenge-MQTT-BugList) 
![Github stars](https://img.shields.io/github/stars/DWCTOD/interview.svg)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/supmaster/Creative-Challenge-MQTT-BugList">
    <img src="Screenshots/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">MQTT-TaskBoard</h3>

  <p align="center">
    A serverless product helps your team to deal with daily tasks, witch is based on Easemob MQTT !
    <br />
    <strong>Task Board , All in Sight</strong>
    <br />
    <a href="https://github.com/supmaster/Creative-Challenge-MQTT-BugList/blob/main/README.md"><strong>中文版文档 »</strong></a>
    <br />
    <br />
    <a href="https://github.com/supmaster/Creative-Challenge-MQTT-BugList" title="Not Support yet,need MQTT server key!">View Demo</a>
    ·
    <a href="https://github.com/supmaster/Creative-Challenge-MQTT-BugList/issues">Report Bug</a>
    ·
    <a href="https://github.com/supmaster/Creative-Challenge-MQTT-BugList/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">索引</h2></summary>
  <ol>
    <li>
      <a href="#1-项目背景">1 项目背景</a>
      <ul>
        <li><a href="#1.1-大赛背景">1.1 大赛背景</a></li>
        <li><a href="#1.2-赛道赛题">1.2 赛道赛题</a></li>
        <li><a href="#1.3-应用背景">1.3 应用背景</a></li>
          <ul>
            <li><a href="#1.3.1-应用现状">1.3.1 应用现状</a></li>
            <li><a href="#1.3.2-开发测试痛点">1.3.2 开发测试痛点</a></li>
            <li><a href="#1.3.3-小团队成本问题">1.3.3 小团队成本问题</a></li>
          </ul>
      </ul>
    </li>
    <li>
      <a href="#1.4-适用对象">1.4 适用对象</a>
      <a href="#1.5-应用领域">1.5 应用领域</a>
      <ul>
        <li><a href="#1.5.1-开发测试">1.5.1 开发测试</a></li>
        <li><a href="#1.5.2-教育教学">1.5.2 教育教学</a></li>
        <li><a href="#1.5.3-会议室预定">1.5.3 会议室预定</a></li>
        <li><a href="#1.5.4-工单处理">1.5.4 工单处理</a></li>
        <li><a href="#1.5.5-经营管理">1.5.5 经营管理</a></li>
        <li><a href="#1.5.6-对口扶贫">1.5.6 对口扶贫</a></li>
        <li><a href="#1.5.7-个人待办">1.5.7 个人待办</a></li>
      </ul>
    </li>
    <li><a href="#2-功能介绍（以Bug List为例）">2 功能介绍（以Bug List为例）</a></li>
      <ul>
        <li><a href="#2.1-系统功能">2.1 系统功能</a></li>
          <ul>
            <li><a href="#2.1.1-配置说明">2.1.1 配置说明</a></li>
            <li><a href="#2.1.2-用户登录">2.1.2 用户登录</a></li>
          </ul>
        <li><a href="#2.2-业务功能">2.2 业务功能</a></li>
          <ul>
            <li><a href="#2.2.1-创建Bug">2.2.1 创建Bug</a></li>
            <li><a href="#2.2.2-认领Bug">2.2.2 认领Bug</a></li>
            <li><a href="#2.2.3-取消认领Bug">2.2.3 取消认领Bug</a></li>
            <li><a href="#2.2.4-解决Bug">2.2.4 解决Bug</a></li>
            <li><a href="#2.2.5-Bug复测不过">2.2.5 Bug复测不过</a></li>
            <li><a href="#2.2.6-删除Bug">2.2.6 删除Bug</a></li>
          </ul>
        <li><a href="#2.3 异常提示">2.3 异常提示</a></li>
          <ul>
            <li><a href="#2.3.1-认领他人Bug">2.3.1 认领他人Bug</a></li>
            <li><a href="#2.3.2-解决未认领Bug">2.3.2 解决未认领Bug</a></li>
          </ul>
      </ul>
    <li><a href="#3-技术组件">3 技术组件</a></li>
    <li><a href="#4-快速上手">4 快速上手</a></li>
    <li><a href="#5-开源协议">5 开源协议</a></li>
    <li><a href="#6-联系作者">6 联系作者</a></li>
    <li><a href="#7-致谢">7 致谢</a></li>
  </ol>
</details>
